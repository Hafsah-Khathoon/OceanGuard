
from datetime import datetime
from mysql.connector import Error

class UserModel:
    def __init__(self, connection):
        self.connection = connection
    
    def create_user(self, user_data: dict):
        if not self.connection:
            return None
            
        cursor = self.connection.cursor()
        try:
            query = """
            INSERT INTO users (name, email, password, role)
            VALUES (%s, %s, %s, %s)
            """
            values = (
                user_data["name"],
                user_data["email"], 
                user_data["password"],
                user_data["role"]
            )
            
            cursor.execute(query, values)
            self.connection.commit()
            
            user_id = cursor.lastrowid
            user_data["id"] = str(user_id)
            user_data["created_at"] = datetime.utcnow()
            
            return user_data
            
        except Error as e:
            print(f"Error creating user: {e}")
            return None
        finally:
            cursor.close()
    
    def find_user_by_email(self, email: str):
        if not self.connection:
            return None
            
        cursor = self.connection.cursor(dictionary=True)
        try:
            query = "SELECT * FROM users WHERE email = %s"
            cursor.execute(query, (email,))
            user = cursor.fetchone()
            
            if user:
                user["id"] = str(user["id"])
            
            return user
            
        except Error as e:
            print(f"Error finding user by email: {e}")
            return None
        finally:
            cursor.close()
    
    def find_user_by_id(self, user_id: str):
        if not self.connection:
            return None
            
        cursor = self.connection.cursor(dictionary=True)
        try:
            query = "SELECT * FROM users WHERE id = %s"
            cursor.execute(query, (int(user_id),))
            user = cursor.fetchone()
            
            if user:
                user["id"] = str(user["id"])
            
            return user
            
        except Error as e:
            print(f"Error finding user by ID: {e}")
            return None
        finally:
            cursor.close()
