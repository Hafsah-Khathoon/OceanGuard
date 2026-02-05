#!/usr/bin/env python3
"""
OceanGuard Backend - Python FastAPI Server
Run this file to start the backend server
"""

import sys
import os
import subprocess

# Add src directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

def install_requirements():
    """Install Python requirements if needed"""
    try:
        import fastapi
        import uvicorn
        import pymongo
        print("✅ All required packages are installed")
    except ImportError as e:
        print(f"❌ Missing package: {e}")
        print("Installing requirements...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])

def main():
    """Main function to start the server"""
    print("🌊 Starting OceanGuard Backend Server...")
    
    # Check and install requirements
    install_requirements()
    
    # Import and run the server
    try:
        from src.server import app
        import uvicorn
        
        port = int(os.getenv("PORT", 5000))
        print(f"🚀 Backend running on port {port}")
        uvicorn.run(app, host="0.0.0.0", port=port, reload=True)
        
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()