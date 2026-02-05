
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Globe, Shield, Navigation, ExternalLink, Search } from 'lucide-react';
import { MOCK_NGOS } from '../../constants';

declare const L: any;

const NearbyNGOs: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [selectedNgo, setSelectedNgo] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Center on Southeast Asia as per mock data
    mapRef.current = L.map(mapContainerRef.current, {
      center: [1.3521, 103.8198],
      zoom: 11,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(mapRef.current);

    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);

    MOCK_NGOS.forEach(ngo => {
      const marker = L.marker([ngo.lat, ngo.lng], {
        icon: L.divIcon({
          className: 'ngo-marker',
          html: `<div style="background-color: #0d9488; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; items-center; justify-center; border: 3px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"><div style="transform: rotate(45deg); color: white; font-size: 14px; font-weight: bold;">OG</div></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        })
      }).addTo(mapRef.current);

      marker.on('click', () => {
        setSelectedNgo(ngo.id);
        mapRef.current.setView([ngo.lat, ngo.lng], 14, { animate: true });
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleNgoClick = (ngo: any) => {
    setSelectedNgo(ngo.id);
    if (mapRef.current) {
      mapRef.current.setView([ngo.lat, ngo.lng], 14, { animate: true });
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Sidebar List */}
      <div className="w-full md:w-[400px] flex flex-col border-r border-slate-200 bg-slate-50/50 shadow-xl z-20 overflow-y-auto">
        <div className="p-6 bg-white border-b border-slate-200 sticky top-0">
           <h1 className="text-2xl font-bold text-slate-900 mb-2">Nearby NGO Hubs</h1>
           <p className="text-xs text-slate-500 font-medium mb-6">Connect with professional maritime agencies.</p>
           
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
             <input 
               type="text" 
               placeholder="Search by name or focus area..." 
               className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20"
             />
           </div>
        </div>

        <div className="p-4 space-y-4">
          {MOCK_NGOS.map((ngo) => (
            <div 
              key={ngo.id} 
              onClick={() => handleNgoClick(ngo)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-lg ${
                selectedNgo === ngo.id 
                ? 'bg-teal-700 text-white border-teal-700 shadow-teal-700/20' 
                : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
               <div className="flex items-start justify-between mb-3">
                 <h3 className="font-bold leading-tight">{ngo.name}</h3>
                 <Shield className={`w-5 h-5 ${selectedNgo === ngo.id ? 'text-teal-300' : 'text-teal-600'}`} />
               </div>
               
               <div className={`space-y-2 text-xs font-medium ${selectedNgo === ngo.id ? 'text-teal-50' : 'text-slate-500'}`}>
                 <div className="flex items-center gap-2"><MapPin size={14} className="shrink-0" /> {ngo.location}</div>
                 <div className="flex items-center gap-2"><Phone size={14} className="shrink-0" /> {ngo.phone}</div>
                 <div className="flex items-center gap-2"><Globe size={14} className="shrink-0" /> {ngo.web}</div>
               </div>

               <div className={`mt-4 pt-4 border-t flex items-center justify-between ${selectedNgo === ngo.id ? 'border-teal-600/50' : 'border-slate-50'}`}>
                 <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedNgo === ngo.id ? 'text-teal-200' : 'text-teal-700'}`}>
                   Focus: {ngo.focus}
                 </span>
                 <Navigation size={14} className={selectedNgo === ngo.id ? 'text-white' : 'text-slate-400'} />
               </div>
            </div>
          ))}
        </div>

        {selectedNgo && (
          <div className="mt-auto p-6 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button className="w-full py-3 bg-teal-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-800 transition-all">
              Contact Organization <ExternalLink size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Map Content */}
      <div ref={mapContainerRef} className="flex-1 bg-slate-100 z-10" />
    </div>
  );
};

export default NearbyNGOs;
