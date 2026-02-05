
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Import database connection
from config.db import connect_db

# Import routes
from routes.auth_routes import auth_bp
from routes.citizen_routes import citizen_bp
from routes.volunteer_routes import volunteer_bp
from routes.admin_routes import admin_bp

# Create Flask app
app = Flask(__name__)
CORS(app)

# Connect to database
connect_db()

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(citizen_bp, url_prefix='/api/citizen')
app.register_blueprint(volunteer_bp, url_prefix='/api/volunteer')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

@app.route('/')
def root():
    return {"message": "OceanGuard API is running!"}
