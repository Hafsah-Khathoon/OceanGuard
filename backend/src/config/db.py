
import os
import mysql.connector
from mysql.connector import Error

# Global database connection
connection = None

def connect_db():
    global connection
    try:
        # MySQL connection parameters
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST", "localhost"),
            port=os.getenv("DB_PORT", 3306),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD", ""),
            database=os.getenv("DB_NAME", "oceanguard")
        )
        
        if connection.is_connected():
            print("✅ MySQL connected successfully")
            create_tables()
        
    except Error as e:
        print(f"⚠️  MySQL connection failed: {e}")
        print("📝 Please check your MySQL connection settings in backend/.env")
        print("   Make sure MySQL server is running and credentials are correct")
        connection = None

def create_tables():
    """Create necessary tables if they don't exist"""
    if not connection:
        return
        
    cursor = connection.cursor()
    
    # Create users table
    create_users_table = """
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('citizen', 'volunteer', 'admin') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """
    
    # Create plastic_reports table
    create_reports_table = """
    CREATE TABLE IF NOT EXISTS plastic_reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image VARCHAR(500),
        location_lat DECIMAL(10, 8),
        location_lng DECIMAL(11, 8),
        severity VARCHAR(50) NOT NULL,
        status ENUM('pending', 'verified', 'cleaned') DEFAULT 'pending',
        reported_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (reported_by) REFERENCES users(id)
    )
    """
    
    try:
        cursor.execute(create_users_table)
        cursor.execute(create_reports_table)
        connection.commit()
        print("✅ Database tables created successfully")
    except Error as e:
        print(f"❌ Error creating tables: {e}")
    finally:
        cursor.close()

def get_database():
    return connection
