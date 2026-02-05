
import React from 'react';
import { Shield, Anchor, Map, Users, BarChart3, Droplets, Info, Award, Settings, Trash2, Sliders } from 'lucide-react';

export const COLORS = {
  NAVY: '#001f3f',
  TEAL: '#008080',
  SOFT_GRAY: '#f4f4f4',
  ACCENT_BLUE: '#0ea5e9',
};

export const IMAGES = {
  HERO: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=2000', // Real heavy plastic pollution
  POLLUTION: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbe5e?auto=format&fit=crop&q=80&w=1200', // Documentary: plastic waste in ocean
  POLLUTION_FALLBACK: 'https://images.unsplash.com/photo-1532996122724-e3f35492f70e?auto=format&fit=crop&q=80&w=1200', // Beach plastic debris
  CLEANUP: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&q=80&w=1200', // Real volunteers on beach
  WILDLIFE: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1200', // Sea turtle
  CORAL: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=1200', // Coral reef
  MICROPLASTIC: 'https://images.unsplash.com/photo-1526951521990-620dc14c214b?auto=format&fit=crop&q=80&w=1200', // Lab/Microplastic look
};

export const MOCK_REPORTS = [
  { id: '1', status: 'Pending', location: 'Santa Monica Beach', type: 'Microplastics', lat: 34.0195, lng: -118.4912, severity: 'Medium' },
  { id: '2', status: 'Verified', location: 'Great Barrier Reef', type: 'Ghost Nets', lat: -18.2871, lng: 147.6992, severity: 'Critical' },
  { id: '3', status: 'Resolved', location: 'Manila Bay', type: 'Single-use Bottles', lat: 14.5995, lng: 120.9842, severity: 'High' },
  { id: '4', status: 'Pending', location: 'Cornwall Coast', type: 'Industrial Waste', lat: 50.4131, lng: -4.6644, severity: 'High' },
];

export const MOCK_NGOS = [
  { id: 'n1', name: 'Ocean Conservancy Intl', lat: 1.2834, lng: 103.8607, location: 'Marina Bay, SG', phone: '+65 9122 3442', web: 'oceanconservancy.org', focus: 'Large-scale extraction' },
  { id: 'n2', name: 'Coastal Watch Alliance', lat: 1.2494, lng: 103.8303, location: 'Sentosa Cove', phone: '+65 8223 1112', web: 'coastalwatch.sg', focus: 'Education & Policy' },
  { id: 'n3', name: 'Marine Life Rescue', lat: 1.4116, lng: 103.9575, location: 'Pulau Ubin', phone: '+65 6773 2210', web: 'marinerescue.sg', focus: 'Wildlife Protection' },
];

export const NAV_LINKS = {
  CITIZEN: [
    { name: 'Home', path: '/', icon: <Anchor className="w-5 h-5" /> },
    { name: 'Report', path: '/report', icon: <Trash2 className="w-5 h-5" /> },
    { name: 'Ocean Map', path: '/map', icon: <Map className="w-5 h-5" /> },
    { name: 'Nearby NGOs', path: '/ngos', icon: <Info className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <Sliders className="w-5 h-5" /> },
  ],
  VOLUNTEER: [
    { name: 'Missions', path: '/missions', icon: <Shield className="w-5 h-5" /> },
    { name: 'Upload Proof', path: '/proof', icon: <Droplets className="w-5 h-5" /> },
    { name: 'Certificates', path: '/certificates', icon: <Award className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <Sliders className="w-5 h-5" /> },
  ],
  ADMIN: [
    { name: 'Overview', path: '/admin', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Intel Map', path: '/admin/intel', icon: <Map className="w-5 h-5" /> },
    { name: 'Verification', path: '/admin/verify', icon: <Shield className="w-5 h-5" /> },
    { name: 'Operations', path: '/admin/ops', icon: <Settings className="w-5 h-5" /> },
    { name: 'Safety Analysis', path: '/admin/safety', icon: <Droplets className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <Sliders className="w-5 h-5" /> },
  ]
};
