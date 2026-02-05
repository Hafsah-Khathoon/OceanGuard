
from app import app
import os

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"Backend running on port {port}")
    app.run(host="0.0.0.0", port=port, debug=True)
