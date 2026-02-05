
import React, { useState } from 'react';
import { UserRole } from '../types';
import { IMAGES } from '../constants';
import { Shield, Eye, EyeOff } from 'lucide-react';

interface AuthProps {
  onLogin: (role: UserRole) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>(UserRole.CITIZEN);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left Visual Section */}
      <div className="hidden lg:flex flex-1 relative ocean-gradient overflow-hidden">
        <img 
          src={IMAGES.HERO} 
          className="absolute inset-0 w-full h-full object-cover opacity-50" 
          alt="Ocean pollution documentary"
        />
        <div className="relative z-10 flex flex-col justify-center px-20 text-white max-w-3xl">
          <Shield className="w-16 h-16 mb-8 text-teal-300" />
          <h1 className="text-6xl font-bold mb-6 leading-tight">Preserving Our Oceans for Tomorrow.</h1>
          <p className="text-xl text-teal-50 leading-relaxed mb-8">
            OceanGuard is a real-time monitoring platform dedicated to achieving SDG-14 goals through community action, data analysis, and professional intervention.
          </p>
          <div className="flex gap-12">
            <div>
              <div className="text-4xl font-bold text-teal-300">124k</div>
              <div className="text-sm uppercase tracking-widest opacity-70">Metric Tons Monitored</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-300">5,800</div>
              <div className="text-sm uppercase tracking-widest opacity-70">Volunteers Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-20 bg-white">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-teal-800 rounded-xl flex items-center justify-center text-white text-2xl font-bold">OG</div>
            <h2 className="text-2xl font-bold text-slate-800">OceanGuard Portal</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Access Role</label>
              <div className="grid grid-cols-3 gap-2">
                {[UserRole.CITIZEN, UserRole.VOLUNTEER, UserRole.ADMIN].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`text-[11px] py-2 px-1 rounded-lg border font-bold transition-all ${
                      role === r 
                        ? 'bg-teal-50 border-teal-600 text-teal-700 shadow-sm' 
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                defaultValue="platform@oceanguard.org"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-semibold text-teal-600 hover:text-teal-700">Forgot Password?</a>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  defaultValue="password123"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="••••••••"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              onClick={() => onLogin(role)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              Sign In
            </button>

            <div className="pt-6 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm">
                Interested in joining the mission? <br/>
                <a href="#" className="text-teal-600 font-bold hover:underline">Apply as a Volunteer</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
