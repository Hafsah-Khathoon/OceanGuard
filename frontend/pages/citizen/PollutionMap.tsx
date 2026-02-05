import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Map as MapIcon, Filter, Layers, AlertTriangle, Search } from 'lucide-react';
import { MOCK_REPORTS } from '../../constants';
import { useOceanGuard } from '../../context/OceanGuardContext';

declare const L: any;

interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  type: string;
  location: string;
  severity: string;
  date?: string;
  status?: string;
}

function severityColor(severity: string): string {
  if (severity === 'Critical') return '#ef4444';
  if (severity === 'High') return '#f59e0b';
  if (severity === 'Medium') return '#eab308';
  return '#22c55e';
}

const PollutionMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const { citizenReports } = useOceanGuard();
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const allPoints = useMemo((): MapPoint[] => {
    const mock: MapPoint[] = MOCK_REPORTS.map((r) => ({
      id: r.id,
      lat: r.lat,
      lng: r.lng,
      type: r.type,
      location: r.location,
      severity: r.severity,
      status: r.status,
    }));
    const fromCitizen: MapPoint[] = citizenReports
      .filter((r) => r.location.lat !== 0 || r.location.lng !== 0)
      .map((r) => ({
        id: r.id,
        lat: r.location.lat,
        lng: r.location.lng,
        type: r.plasticType || 'Reported',
        location: r.location.address || `${r.location.lat.toFixed(4)}, ${r.location.lng.toFixed(4)}`,
        severity: r.severity,
        date: r.date ? new Date(r.date).toLocaleDateString() : undefined,
      }));
    return [...fromCitizen, ...mock];
  }, [citizenReports]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current, {
      center: [20, 0],
      zoom: 3,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(mapRef.current);

    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);
    markersLayerRef.current = L.layerGroup().addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!markersLayerRef.current || !mapRef.current) return;
    markersLayerRef.current.clearLayers();
    allPoints.forEach((point) => {
      const color = severityColor(point.severity);
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 12px ${color}"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      const popupContent = `
        <div class="p-2 min-w-[160px]">
          <h4 class="font-bold text-slate-800 text-sm mb-1">${point.type}</h4>
          <p class="text-xs text-slate-500 mb-2">${point.location}</p>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" style="background-color: ${color}22; color: ${color}">${point.severity}</span>
            ${point.date ? `<span class="text-[10px] text-slate-400">${point.date}</span>` : ''}
            ${point.status ? `<span class="text-[10px] text-slate-400 font-bold">${point.status}</span>` : ''}
          </div>
        </div>
      `;
      L.marker([point.lat, point.lng], { icon: customIcon })
        .addTo(markersLayerRef.current)
        .bindPopup(popupContent);
    });
  }, [allPoints]);

  const handleSearchPlace = async () => {
    const q = searchQuery.trim();
    if (!q || !mapRef.current) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`,
        { headers: { Accept: 'application/json' } }
      );
      const data = await res.json();
      if (data && data[0]) {
        const { lat, lon } = data[0];
        mapRef.current.setView([parseFloat(lat), parseFloat(lon)], 12);
      }
    } catch (_) {}
    setSearching(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col relative overflow-hidden">
      {/* Header UI */}
      <div className="bg-white/80 backdrop-blur-md px-8 py-3 border-b border-slate-200 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-6">
          <h1 className="font-bold text-slate-900 flex items-center gap-2">
            <MapIcon size={18} className="text-teal-600" /> Global Ocean Intelligence
          </h1>
          <div className="hidden md:flex gap-4">
            <LegendItem color="bg-rose-500" label="Critical" />
            <LegendItem color="bg-amber-500" label="Accumulating" />
            <LegendItem color="bg-teal-500" label="Recovering" />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchPlace()}
              placeholder="Search place..."
              className="px-3 py-2 text-sm w-40 md:w-52 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={handleSearchPlace}
              disabled={searching}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-70"
            >
              <Search size={14} /> {searching ? '…' : 'Go'}
            </button>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 shadow-sm transition-all">
            <Layers size={14} /> Layers
          </button>
          <button className="flex items-center gap-2 text-xs font-bold text-white bg-teal-700 px-4 py-2 rounded-lg hover:bg-teal-800 shadow-sm transition-all">
            <Filter size={14} /> Filter Reports
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className="flex-1 w-full h-full z-0" />

      {/* Floating Info Overlay */}
      <div className="absolute bottom-8 left-8 z-10 w-80 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-white shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-2 mb-4 text-teal-400">
            <AlertTriangle size={18} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Active Monitoring</span>
          </div>
          <h2 className="text-xl font-bold mb-2">North Pacific Focus</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            Current satellite data shows a 12% increase in microplastic density near the Hawaiian archipelago. Coastal NGOs alerted.
          </p>
          <div className="space-y-4">
            <ProgressStat label="Surface Density" value={78} color="bg-rose-500" />
            <ProgressStat label="Verified Points" value={1420} max={2000} color="bg-teal-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
    <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div> {label}
  </span>
);

const ProgressStat = ({ label, value, max = 100, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
      <span>{label}</span>
      <span className="text-white">{value}{max === 100 ? '%' : ''}</span>
    </div>
    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${(value/max)*100}%` }}></div>
    </div>
  </div>
);

export default PollutionMap;
