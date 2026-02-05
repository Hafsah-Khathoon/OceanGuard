
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Calendar, Clock, ArrowRight, Star } from 'lucide-react';
import { IMAGES } from '../../constants';

const Missions: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Active Missions</h1>
          <p className="text-slate-500">Every cleanup brings us closer to a healthier ocean ecosystem.</p>
        </div>
        <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white">
            <Star className="w-6 h-6 fill-white" />
          </div>
          <div>
             <div className="text-[10px] font-bold text-amber-600 uppercase">Current Tier</div>
             <div className="text-sm font-bold text-slate-800">Advanced Guardian</div>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <MissionCard 
            missionId="mission-serenity"
            img={IMAGES.CLEANUP}
            title="Sands of Serenity Beach Sweep"
            status="Ongoing"
            date="Oct 24, 2024"
            location="East Coast Beach Park"
            time="08:00 AM"
            spotsLeft={0}
          />
          <MissionCard 
            missionId="mission-coral"
            img={IMAGES.CORAL}
            title="Coral Reef Microplastic Survey"
            status="Upcoming"
            date="Nov 12, 2024"
            location="Outer Reef, Sector 12"
            time="10:30 AM"
            spotsLeft={4}
          />
        </div>

        <aside className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-6">Mission Guidelines</h3>
             <ul className="space-y-4">
               <li className="flex gap-3 text-sm text-slate-600">
                 <div className="w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">1</div>
                 Always wear provided protective gear (gloves, footwear).
               </li>
               <li className="flex gap-3 text-sm text-slate-600">
                 <div className="w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">2</div>
                 Document "Before" state before beginning collection.
               </li>
               <li className="flex gap-3 text-sm text-slate-600">
                 <div className="w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">3</div>
                 Keep 5m distance from nesting wildlife.
               </li>
             </ul>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl text-white">
            <Shield className="w-10 h-10 text-teal-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Get Insured</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              All volunteers are covered by our NGO-grade field insurance. Make sure your profile is fully updated.
            </p>
            <button className="w-full py-2 bg-white text-slate-900 rounded-lg font-bold text-sm">
              Update Profile
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

const MissionCard = ({ missionId, img, title, status, date, location, time, spotsLeft }: any) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group" data-mission-id={missionId}>
    <div className="flex flex-col md:flex-row">
      <div className="md:w-64 h-48 md:h-auto overflow-hidden relative">
        <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={title} />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${status === 'Ongoing' ? 'bg-teal-500 text-white' : 'bg-blue-500 text-white'}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="p-6 flex-1">
        <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Calendar size={16} className="text-teal-600" /> {date}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Clock size={16} className="text-teal-600" /> {time}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium col-span-2">
            <MapPin size={16} className="text-teal-600" /> {location}
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
           {spotsLeft > 0 ? (
             <span className="text-xs font-bold text-blue-600">{spotsLeft} Spots Remaining</span>
           ) : (
             <span className="text-xs font-bold text-slate-400">Mission Full</span>
           )}
           <Link to="/proof" className="text-slate-900 font-bold flex items-center gap-1 hover:gap-2 transition-all">
             Mission Details <ArrowRight size={18} />
           </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Missions;
