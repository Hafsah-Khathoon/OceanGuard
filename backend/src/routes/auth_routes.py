
from flask import Blueprint, request, jsonify
from functools import wraps
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os

from models.user_model import UserModel
from config.db import get_database

auth_bp = Blueprint('auth', __name__)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("JWT_SECRET", "oceanguard_secret_key_2024")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header:
            try:
                token = auth_header.split(" ")[1]  # Bearer <token>
            except IndexError:
                return jsonify({'message': 'Invalid token format'}), 401
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id = payload.get("sub")
            if user_id is None:
                return jsonify({'message': 'Invalid token'}), 401
                
            db = get_database()
            if not db:
                return jsonify({'message': 'Database connection failed'}), 500
            
            user_model = UserModel(db)
            current_user = user_model.find_user_by_id(user_id)
            if current_user is None:
                return jsonify({'message': 'User not found'}), 401
                
        except JWTError:
            return jsonify({'message': 'Invalid token'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    
    if not data or not all(k in data for k in ('name', 'email', 'password', 'role')):
        return jsonify({'message': 'Missing required fields'}), 400
    
    db = get_database()
    if not db:
        return jsonify({'message': 'Database connection failed'}), 500
    
    user_model = UserModel(db)
    
    # Check if user already exists
    existing_user = user_model.find_user_by_email(data['email'])
    if existing_user:
        return jsonify({'message': 'Email already registered'}), 400
    
    # Hash password and create user
    hashed_password = get_password_hash(data['password'])
    user_data = {
        "name": data['name'],
        "email": data['email'],
        "password": hashed_password,
        "role": data['role']
    }
    
    created_user = user_model.create_user(user_data)
    # Remove password from response
    del created_user['password']
    return jsonify(created_user), 201

@auth_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    
    if not data or not all(k in data for k in ('email', 'password')):
        return jsonify({'message': 'Missing email or password'}), 400
    
    db = get_database()
    if not db:
        return jsonify({'message': 'Database connection failed'}), 500
    
    user_model = UserModel(db)
    
    user = user_model.find_user_by_email(data['email'])
    if not user or not verify_password(data['password'], user["password"]):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["id"], "role": user["role"]},
        expires_delta=access_token_expires
    )
    
    return jsonify({"access_token": access_token, "token_type": "bearer"})
