#!/usr/bin/env python3
"""
Script to create the OceanGuard database and tables
Run this once to set up your MySQL database
"""

import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_database():
    try:
        # Connect to MySQL server (without specifying database)
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST", "localhost"),
            port=os.getenv("DB_PORT", 3306),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD", "")
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            
            # Create database
            cursor.execute("CREATE DATABASE IF NOT EXISTS oceanguard")
            print("✅ Database 'oceanguard' created successfully")
            
            # Use the database
            cursor.execute("USE oceanguard")
            
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
            
            cursor.execute(create_users_table)
            cursor.execute(create_reports_table)
            
            print("✅ Tables created successfully")
            print("🌊 OceanGuard database is ready!")
            
    except Error as e:
        print(f"❌ Error: {e}")
    
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    print("🌊 Creating OceanGuard Database...")
    create_database()