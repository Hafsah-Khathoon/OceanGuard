
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin, Upload, AlertCircle, CheckCircle2, X, Info, Navigation, Shield } from 'lucide-react';
import { useOceanGuard } from '../../context/OceanGuardContext';
import type { CitizenReportEntry } from '../../types';

const CATEGORY_TO_SEVERITY: Record<string, CitizenReportEntry['severity']> = {
  'Microplastics': 'Medium',
  'Single-use Plastic': 'High',
  'Ghost Nets': 'Critical',
  'Industrial': 'High',
  'Organic/Mixed': 'Low',
};

const ReportPlastic: React.FC = () => {
  const { addCitizenReport } = useOceanGuard();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [locationStr, setLocationStr] = useState('');
  const [category, setCategory] = useState('Microplastics');
  const [volume, setVolume] = useState('');
  const [landmark, setLandmark] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setPreviewImage(null);

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStr(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} (GPS Verified)`);
        },
        () => {
          alert('Unable to retrieve location. Please enter it manually.');
        }
      );
    }
  };

  const parseLatLng = (str: string): { lat: number; lng: number } => {
    const match = str.match(/(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/);
    if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
    return { lat: 0, lng: 0 };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { lat, lng } = parseLatLng(locationStr);
    const severity = CATEGORY_TO_SEVERITY[category] ?? 'Medium';
    addCitizenReport({
      location: { lat, lng, address: landmark || locationStr || undefined },
      imageUrl: previewImage || '',
      severity,
      plasticType: category,
      estimatedVolume: volume || undefined,
    });
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-teal-600/10">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Official Report Filed</h1>
        <p className="text-slate-600 text-lg mb-10 leading-relaxed">
          Your documentation has been received and timestamped. It is currently being processed by our NGO network for verification against SDG-14 metrics.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() => { setSubmitted(false); setPreviewImage(null); setLocationStr(''); setCategory('Microplastics'); setVolume(''); setLandmark(''); }}
            className="bg-teal-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-800 transition-all shadow-lg"
          >
            File Another Report
          </button>
          <Link
            to="/map"
            className="bg-slate-100 text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all text-center"
          >
            View Ocean Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Report Marine Debris</h1>
          <p className="text-slate-500 font-medium">Contribute to the Global Ocean Intelligence Network.</p>
        </div>
        <div className="bg-amber-50 px-4 py-2 rounded-lg border border-amber-200 flex items-center gap-2 text-amber-700 text-xs font-bold">
          <AlertCircle size={14} /> High-Priority Protocol Active
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-8">
          {/* Image Upload Area */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-teal-600" /> Photographic Evidence
            </h3>
            
            {previewImage ? (
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 shadow-inner">
                <img src={previewImage} className="w-full h-full object-cover" alt="Pollution preview" />
                <button 
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-teal-500 hover:bg-teal-50/30 transition-all cursor-pointer">
                <input type="file" className="hidden" id="file-upload" accept="image/*" onChange={handleFileChange} />
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <Upload className="mx-auto w-12 h-12 text-slate-300 group-hover:text-teal-500 mb-4 transition-transform group-hover:-translate-y-1" />
                  <span className="block text-base font-bold text-slate-700 mb-1">Click to Capture or Upload</span>
                  <span className="text-sm text-slate-400">High-resolution JPEG or PDF required</span>
                </label>
              </div>
            )}
            
            <div className="mt-6 flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
               <Info className="text-teal-600 shrink-0 mt-0.5" size={16} />
               <p className="text-xs text-slate-500 leading-relaxed">
                 Ensure the photo shows clear markers of the debris type and surrounding environment for GPS correlation.
               </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600" /> Deployment Geolocation
            </h3>
            <div className="space-y-6">
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={getGeoLocation}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 shadow-lg transition-all active:scale-95"
                >
                  <Navigation size={18} /> GPS Auto-Locate
                </button>
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={locationStr}
                    onChange={(e) => setLocationStr(e.target.value)}
                    className="w-full h-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500/20" 
                    placeholder="Latitude, Longitude" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Manual Landmark Description</label>
                <input type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. 500m North of Sandy Bay Pier" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Debris Analysis</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Pollution Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold appearance-none focus:ring-2 focus:ring-teal-500/20">
                  {['Microplastics', 'Single-use Plastic', 'Ghost Nets', 'Industrial', 'Organic/Mixed'].map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Estimated Volume</label>
                <select value={volume} onChange={(e) => setVolume(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold appearance-none focus:ring-2 focus:ring-teal-500/20">
                  {['Trivial (Pocket sized)', 'Minor (Bag sized)', 'Moderate (Multiple bags)', 'Significant (Manual team)', 'Emergency (Industrial gear)'].map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Observations</label>
                <textarea rows={5} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20" placeholder="e.g. Wildlife in danger, strong odor, chemical sheen..."></textarea>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-900/20">
             <div className="flex items-center gap-2 mb-4 text-teal-400">
               <Shield size={20} />
               <span className="text-[10px] font-bold uppercase tracking-widest">Submitter Assurance</span>
             </div>
             <p className="text-sm text-slate-400 leading-relaxed mb-8 italic">
               By submitting, I confirm this data is an accurate representation of current conditions for SDG-14 monitoring.
             </p>
             <button 
              type="submit" 
              disabled={loading || !previewImage}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                loading ? 'bg-slate-700' : (!previewImage ? 'bg-slate-700 opacity-50 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500 active:scale-[0.98]')
              }`}
            >
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" /> : 'File Official Report'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportPlastic;
