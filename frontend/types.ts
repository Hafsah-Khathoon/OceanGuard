
export enum UserRole {
  CITIZEN = 'Citizen Reporter',
  VOLUNTEER = 'Volunteer',
  ADMIN = 'NGO Administrator',
  GUEST = 'Guest'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Report {
  id: string;
  reporterId: string;
  location: { lat: number; lng: number; address: string };
  imageUrl: string;
  timestamp: string;
  status: 'Pending' | 'Verified' | 'Resolved';
  plasticType?: string;
  estimatedVolume?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: 'Upcoming' | 'Active' | 'Completed' | 'Ongoing';
  requiredVolunteers: number;
  currentVolunteers: number;
}

export interface VolunteerSignup {
  id: string;
  name: string;
  email: string;
  contact: string;
  createdAt: string;
}

export interface CitizenReportEntry {
  id: string;
  location: { lat: number; lng: number; address?: string };
  imageUrl: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
  plasticType?: string;
  estimatedVolume?: string;
}
