
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Camera, Trash2, ArrowRight, CheckCircle2, X, Shield } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useOceanGuard } from '../../context/OceanGuardContext';

const DEFAULT_MISSION_ID = 'mission-serenity';

const ProofUpload: React.FC = () => {
  const user = useUser();
  const { completeMissionForUser } = useOceanGuard();
  const [beforeImg, setBeforeImg] = useState<string | null>(null);
  const [afterImg, setAfterImg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'before') setBeforeImg(reader.result as string);
        else setAfterImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalSubmit = () => {
    setSubmitting(true);
    if (user) completeMissionForUser(user.id, DEFAULT_MISSION_ID);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Mission Validated</h1>
        <p className="text-slate-600 text-lg mb-10">
          Your mission proof has been uploaded. Credits and SDG impact points will be added to your profile once verified by the mission lead.
        </p>
        <Link
          to="/missions"
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all inline-block"
        >
          Back to Missions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Mission Validation Portal</h1>
        <p className="text-slate-500 font-medium text-lg">Document your impact on SDG-14 goals.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2 border-b border-slate-50 pb-4">
              <Camera className="text-slate-400" /> Photometric Comparison
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Initial State (Before)</label>
                {beforeImg ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 group">
                    <img src={beforeImg} className="w-full h-full object-cover" alt="Before" />
                    <button onClick={() => setBeforeImg(null)} className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={16}/></button>
                  </div>
                ) : (
                  <div className="aspect-video border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-teal-50/50 hover:border-teal-500 transition-all cursor-pointer group">
                    <input type="file" className="hidden" id="before-up" onChange={(e) => handleUpload(e, 'before')} />
                    <label htmlFor="before-up" className="cursor-pointer text-center flex flex-col items-center">
                      <Upload className="w-8 h-8 text-slate-300 mb-3 group-hover:text-teal-600 transition-colors" />
                      <span className="text-sm font-bold text-slate-500">Capture Initial Debris</span>
                    </label>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Restored State (After)</label>
                {afterImg ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 group">
                    <img src={afterImg} className="w-full h-full object-cover" alt="After" />
                    <button onClick={() => setAfterImg(null)} className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={16}/></button>
                  </div>
                ) : (
                  <div className="aspect-video border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-teal-50/50 hover:border-teal-500 transition-all cursor-pointer group">
                    <input type="file" className="hidden" id="after-up" onChange={(e) => handleUpload(e, 'after')} />
                    <label htmlFor="after-up" className="cursor-pointer text-center flex flex-col items-center">
                      <Upload className="w-8 h-8 text-slate-300 mb-3 group-hover:text-teal-600 transition-colors" />
                      <span className="text-sm font-bold text-slate-500">Capture Final Restoration</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Extraction Metrics</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Weight Collected (KG)</label>
                <input type="number" step="0.1" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold" placeholder="0.0" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Standard Bags Used</label>
                <input type="number" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold" placeholder="0" />
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <Shield className="text-teal-400" /> Field Assurance
             </h3>
             <ul className="space-y-6">
                <li className="flex gap-4">
                   <div className="w-6 h-6 bg-teal-600/20 text-teal-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-teal-600/30">1</div>
                   <p className="text-xs text-slate-400 leading-relaxed font-medium">Data integrity checked via EXIF metadata GPS and timestamp validation.</p>
                </li>
                <li className="flex gap-4">
                   <div className="w-6 h-6 bg-teal-600/20 text-teal-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-teal-600/30">2</div>
                   <p className="text-xs text-slate-400 leading-relaxed font-medium">Weight estimates must align with visual photographic evidence.</p>
                </li>
             </ul>

             <div className="mt-10 pt-10 border-t border-white/5">
                <button 
                  onClick={handleFinalSubmit}
                  disabled={!beforeImg || !afterImg || submitting}
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl transition-all flex items-center justify-center gap-2 ${
                    (!beforeImg || !afterImg || submitting) ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500 active:scale-95'
                  }`}
                >
                  {submitting ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" /> : 'Finalize Validation'} <ArrowRight size={18} />
                </button>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
             <Trash2 className="mx-auto text-rose-500 mb-3" />
             <h4 className="font-bold text-slate-800 text-sm mb-1">Disposal Protocol</h4>
             <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Batch ID: #VOL-PR-2024</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProofUpload;
