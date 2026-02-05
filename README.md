# OceanGuard - Marine Plastic Monitoring Platform

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A comprehensive platform for monitoring and combating marine plastic pollution, supporting UN SDG 14 (Life Below Water) through citizen science, volunteer coordination, and NGO administration.

## 🏗️ Project Structure

```
OceanGuard/
├── frontend/              # React + TypeScript frontend
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components (citizen, volunteer, admin)
│   ├── App.tsx           # Main application component
│   ├── constants.tsx     # App constants and configurations
│   ├── types.ts          # TypeScript type definitions
│   ├── package.json      # Frontend dependencies
│   └── vite.config.ts    # Vite configuration
├── backend/              # Node.js + Express backend
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API route handlers
│   │   ├── app.js        # Express app setup
│   │   └── server.js     # Server entry point
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit backend/.env with your MongoDB URI and JWT secret

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🌊 Features

### Multi-Role Platform
- **Citizens**: Report plastic pollution with photos and GPS coordinates
- **Volunteers**: Join cleanup missions and upload proof of work
- **NGO Administrators**: Manage operations, verify reports, and track SDG compliance

### Key Capabilities
- Real-time pollution mapping
- AI-powered report verification
- Mission coordination system
- Digital certificate generation
- SDG-14 compliance tracking
- Global impact analytics

## 🛠️ Technology Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- React Router for navigation
- Recharts for data visualization
- Lucide React for icons
- Tailwind CSS for styling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads
- bcryptjs for password hashing

## 🔧 Configuration

### Frontend Environment Variables
Create `frontend/.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

### Backend Environment Variables
Edit `backend/.env`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## 📱 User Roles & Access

### Citizen Reporter
- Report plastic pollution incidents
- View global pollution map
- Find nearby NGOs
- Access educational resources

### Volunteer
- Browse and join cleanup missions
- Upload proof of cleanup work
- Earn digital certificates
- Track personal impact

### NGO Administrator
- Monitor platform-wide analytics
- Verify citizen reports
- Coordinate volunteer missions
- Generate SDG compliance reports

## 🌍 SDG 14 Alignment

This platform directly supports UN Sustainable Development Goal 14 targets:
- **14.1**: Reduce marine pollution
- **14.2**: Protect marine ecosystems
- **14.4**: Regulate fishing practices
- **14.a**: Increase scientific knowledge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@oceanguard.org or create an issue in this repository.

---

**OceanGuard** - Protecting our oceans through technology and community action 🌊
