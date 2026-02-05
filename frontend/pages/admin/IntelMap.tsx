
import React, { useEffect, useRef, useMemo } from 'react';
import { Layers, MousePointer2, Target } from 'lucide-react';
import { MOCK_REPORTS } from '../../constants';
import { useOceanGuard } from '../../context/OceanGuardContext';

declare const L: any;

const SEVERITY_COLORS = { High: '#ef4444', Critical: '#dc2626', Medium: '#eab308', Low: '#22c55e' };

function getHotspotColor(severity: string): string {
  if (severity === 'Critical' || severity === 'High') return SEVERITY_COLORS.High;
  if (severity === 'Medium') return SEVERITY_COLORS.Medium;
  return SEVERITY_COLORS.Low;
}

const IntelMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const { citizenReports } = useOceanGuard();

  const hotspots = useMemo(() => {
    const fromMock = MOCK_REPORTS.map((r) => ({ lat: r.lat, lng: r.lng, severity: r.severity, label: r.location, type: r.type }));
    const fromCitizen = citizenReports
      .filter((r) => r.location.lat !== 0 || r.location.lng !== 0)
      .map((r) => ({
        lat: r.location.lat,
        lng: r.location.lng,
        severity: r.severity,
        label: r.location.address || `${r.location.lat.toFixed(2)}, ${r.location.lng.toFixed(2)}`,
        type: r.plasticType || 'Reported',
      }));
    return [...fromCitizen, ...fromMock];
  }, [citizenReports]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    mapRef.current = L.map(mapContainerRef.current, {
      center: [20, 20],
      zoom: 3,
      zoomControl: false,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(mapRef.current);
    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);
    layerRef.current = L.layerGroup().addTo(mapRef.current);
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        layerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!layerRef.current || !mapRef.current) return;
    layerRef.current.clearLayers();
    hotspots.forEach((point) => {
      const color = getHotspotColor(point.severity);
      const isHigh = point.severity === 'Critical' || point.severity === 'High';
      const size = isHigh ? 22 : point.severity === 'Medium' ? 18 : 14;
      const customIcon = L.divIcon({
        className: 'intel-hotspot',
        html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:3px solid rgba(255,255,255,0.9);box-shadow:0 0 20px ${color}80, 0 0 40px ${color}40"></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
      L.marker([point.lat, point.lng], { icon: customIcon })
        .addTo(layerRef.current)
        .bindPopup(
          `<div class="p-2 min-w-[180px]">
            <div class="font-bold text-slate-800 text-sm mb-1">${point.type}</div>
            <p class="text-xs text-slate-500 mb-2">${point.label}</p>
            <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase" style="background:${color}22;color:${color}">${point.severity}</span>
          </div>`
        );
    });
  }, [hotspots]);

  return (
    <div className="h-[calc(100vh-64px)] relative bg-slate-200">
      <div ref={mapContainerRef} className="absolute inset-0 z-0" />

      {/* Control Overlays */}
      <div className="absolute top-6 left-6 flex flex-col gap-3 z-10">
        <div className="bg-white/95 backdrop-blur p-4 rounded-xl shadow-2xl border border-slate-200 w-64">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" /> Hotspot Legend
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-lg shadow-rose-500/50" />
              <span className="text-sm font-medium text-slate-700">High / Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white shadow-lg shadow-amber-400/50" />
              <span className="text-sm font-medium text-slate-700">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-lg shadow-emerald-500/50" />
              <span className="text-sm font-medium text-slate-700">Low</span>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur p-4 rounded-xl shadow-2xl border border-slate-200 w-64">
           <div className="flex items-center justify-between mb-4">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selected Region</span>
             <Target size={14} className="text-teal-600" />
           </div>
           <h4 className="text-lg font-bold text-slate-800">Coral Sea Basin</h4>
           <div className="mt-3 grid grid-cols-2 gap-2">
             <div className="p-2 bg-slate-50 rounded">
               <div className="text-[10px] text-slate-500 font-bold">HEALTH</div>
               <div className="text-sm font-bold text-amber-600">FAIR</div>
             </div>
             <div className="p-2 bg-slate-50 rounded">
               <div className="text-[10px] text-slate-500 font-bold">POLLUTION</div>
               <div className="text-sm font-bold text-rose-600">HIGH</div>
             </div>
           </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-96 z-10">
        <div className="bg-slate-900/95 backdrop-blur-md p-6 rounded-2xl text-white shadow-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <MousePointer2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold">Intelligence Feed</h4>
              <p className="text-[10px] text-teal-400 uppercase font-mono">Live Data Stream</p>
            </div>
          </div>
          <div className="space-y-3 h-48 overflow-y-auto pr-2 scrollbar-hide">
            <FeedItem time="12:04" text="Anomaly detected in Sector 4-B (Surface Refraction)" />
            <FeedItem time="11:58" text="Satellite Sentinel-2 data update received" />
            <FeedItem time="11:45" text="Mission #238 report: 4 tons recovered" />
            <FeedItem time="11:32" text="Citizen report verified at Longitude: 121.3" />
            <FeedItem time="11:15" text="Drift analysis update completed for South Pacific" />
          </div>
          <button className="w-full mt-6 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg font-bold text-sm transition-colors">
            Generate Intelligence Report
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedItem = ({ time, text }: any) => (
  <div className="flex gap-3 text-xs leading-relaxed">
    <span className="text-teal-500 font-mono font-bold shrink-0">{time}</span>
    <span className="text-slate-300">{text}</span>
  </div>
);

export default IntelMap;
