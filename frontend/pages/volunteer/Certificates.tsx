
import React, { useState } from 'react';
import { Award, Download, Share2, ShieldCheck, ExternalLink, X, Eye, Lock, Trash2, MapPin, Droplets } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useOceanGuard } from '../../context/OceanGuardContext';

const Certificates: React.FC = () => {
  const user = useUser();
  const { hasUserCompletedMission } = useOceanGuard();
  const [viewingCert, setViewingCert] = useState<any>(null);
  const [certificateName, setCertificateName] = useState('');

  const certs = [
    { title: "Ocean Guardian Level 2", id: "OG-2026-8239", date: "Oct 12, 2026", impact: "240kg Plastic Removed", icon: <ShieldCheck size={28} />, missionId: "mission-serenity", task: "Beach Sweep Completion" },
    { title: "Community Leader Badge", id: "OG-2026-1102", date: "Aug 05, 2026", impact: "12 Missions Led", icon: <Award size={28} />, missionId: "mission-coral", task: "Coral Survey Mission" },
    { title: "Coastal Preservation Specialist", id: "OG-2026-4421", date: "Dec 20, 2025", impact: "50+ Reporting Points", icon: <MapPin size={28} />, missionId: "mission-legacy", task: "Shoreline Reports" },
    { title: "Beach Cleanup Champion", id: "OG-2026-5501", date: "Jan 15, 2026", impact: "5 Beach Cleanups", icon: <Trash2 size={28} />, missionId: "mission-beach", task: "Beach Cleanup Series" },
    { title: "Microplastic Survey Participant", id: "OG-2026-6602", date: "Feb 01, 2026", impact: "Survey Protocol Certified", icon: <Droplets size={28} />, missionId: "mission-survey", task: "Microplastic Survey" },
    { title: "First Response Badge", id: "OG-2026-7703", date: "Mar 10, 2026", impact: "Rapid Response Deployed", icon: <ShieldCheck size={28} />, missionId: "mission-response", task: "First Response Drill" },
  ];

  const defaultVolunteerName = user?.name ?? 'Volunteer';
  const displayName = certificateName.trim() || defaultVolunteerName;
  const isUnlocked = (missionId: string) => user && hasUserCompletedMission(user.id, missionId);
  const openDownloadWindow = (cert: typeof certs[0], nameOnCert: string) => {
    const win = window.open('', '_blank', 'width=700,height=900');
    if (!win) return;
    const name = nameOnCert.trim() || defaultVolunteerName;
    win.document.write(`
      <!DOCTYPE html><html><head><title>Certificate - ${cert.title}</title>
      <style>body{font-family:Inter,sans-serif;padding:2rem;max-width:600px;margin:0 auto;background:#f8fafc}
      .logo{width:80px;height:80px;background:#0d9488;color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:bold;margin:0 auto 2rem}
      .sub{font-size:0.7rem;font-weight:bold;color:#0d9488;letter-spacing:0.3em;margin-bottom:1rem}
      h1{font-size:2.5rem;color:#0f172a;margin-bottom:1rem}
      .name{font-size:1.5rem;font-weight:bold;color:#1e293b;margin:1rem 0;padding-bottom:0.5rem;border-bottom:2px solid #e2e8f0;display:inline-block;padding-left:2rem;padding-right:2rem}
      p{color:#64748b;font-size:0.9rem;line-height:1.6;margin:1.5rem 0}
      .footer{display:flex;justify-content:space-between;margin-top:3rem;font-size:0.7rem;color:#94a3b8}
      @media print{.no-print{display:none}}</style></head><body>
      <div class="logo">OG</div>
      <div class="sub">OFFICIAL CERTIFICATE OF ACHIEVEMENT</div>
      <h1>${cert.title}</h1>
      <p style="font-size:1rem;color:#64748b;font-style:italic">Awarded to</p>
      <div class="name">${name}</div>
      <p>This certificate validates the significant contribution towards SDG-14: Life Below Water through active participation in ${cert.title}. ${cert.impact}.</p>
      <div class="footer">
        <div><strong>Verification ID</strong><br/>${cert.id}</div>
        <div><strong>Date of Issue</strong><br/>${cert.date}</div>
      </div>
      <p class="no-print" style="margin-top:2rem"><button onclick="window.print()" style="padding:0.5rem 1rem;background:#0d9488;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer">Save as PDF / Print</button></p>
      </body></html>
    `);
    win.document.close();
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-16 text-center">
        <div className="w-24 h-24 bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-teal-700/10">
          <Award size={48} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">SDG-14 Achievement Vault</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">Official validation of your contributions to "Life Below Water" preservation efforts.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-600 text-center shadow-sm">
           <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">420kg</div>
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Plastic Recovered</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-600 text-center shadow-sm">
           <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">18</div>
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Missions Successfully Validated</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-600 text-center shadow-sm">
           <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Top 5%</div>
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Volunteer Percentile</div>
        </div>
      </div>

      <div className="space-y-6">
        {certs.map((cert, i) => {
          const unlocked = isUnlocked(cert.missionId);
          return (
            <div key={i} className={`bg-white dark:bg-slate-800 p-8 rounded-3xl border shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group ${unlocked ? 'border-slate-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-xl' : 'border-slate-100 dark:border-slate-700 opacity-80'}`}>
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-inner transition-colors ${unlocked ? 'bg-slate-50 dark:bg-slate-700 text-teal-700 dark:text-teal-300 border-slate-100 dark:border-slate-600 group-hover:bg-teal-700 group-hover:text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 border-slate-200 dark:border-slate-600'}`}>
                  {unlocked ? cert.icon : <Lock size={28} />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{cert.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    <span>Certificate ID: {cert.id}</span>
                    <span className="text-slate-200">•</span>
                    <span>Issued: {cert.date}</span>
                    {!unlocked && <span className="text-amber-600">Complete mission to unlock</span>}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase rounded-full border border-teal-100 dark:bg-teal-900/30 dark:border-teal-800 dark:text-teal-300">
                    Impact Verified: {cert.impact}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setViewingCert(cert); setCertificateName(defaultVolunteerName); }}
                  disabled={!unlocked}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Eye size={18} /> View
                </button>
                <button
                  onClick={() => unlocked && openDownloadWindow(cert, defaultVolunteerName)}
                  disabled={!unlocked}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-teal-700 text-white rounded-xl text-sm font-bold hover:bg-teal-800 transition-all shadow-lg shadow-teal-700/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={18} /> Download
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Viewer Modal - with editable name before download */}
      {viewingCert && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6 overflow-y-auto">
           <div className="bg-white dark:bg-slate-800 max-w-3xl w-full rounded-3xl shadow-2xl overflow-hidden relative">
              <button onClick={() => setViewingCert(null)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors z-10"><X size={24}/></button>
              
              <div className="p-12 text-center border-8 border-teal-50 dark:border-teal-900/50 margin-8 rounded-[2rem]">
                 <div className="w-20 h-20 bg-teal-700 rounded-xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-10 shadow-lg">OG</div>
                 <h2 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-[0.3em] mb-4">Official Certificate of Achievement</h2>
                 <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">{viewingCert.title}</h1>
                 <p className="text-xl text-slate-500 dark:text-slate-400 mb-4 italic">Awarded to</p>
                 <div className="mb-6">
                   <label className="block text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Name on certificate (edit before download)</label>
                   <input
                     type="text"
                     value={certificateName || defaultVolunteerName}
                     onChange={(e) => setCertificateName(e.target.value)}
                     className="w-full max-w-sm mx-auto px-4 py-3 text-center text-2xl font-bold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500"
                     placeholder="Your name"
                   />
                 </div>
                 <p className="max-w-md mx-auto text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-12">
                   This certificate validates the significant contribution towards SDG-14: Life Below Water through active participation in {viewingCert.title}.
                 </p>
                 
                 <div className="flex justify-between items-end">
                    <div className="text-left">
                       <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Verification ID</div>
                       <div className="text-xs font-mono text-slate-600 dark:text-slate-300">{viewingCert.id}</div>
                    </div>
                    <div className="w-32 h-1 bg-slate-100 dark:bg-slate-600 rounded-full mb-2"></div>
                    <div className="text-right">
                       <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Date of Issue</div>
                       <div className="text-xs font-bold text-slate-800 dark:text-white">{viewingCert.date}</div>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700/50 p-6 flex flex-wrap justify-center gap-4">
                 <button onClick={() => viewingCert && openDownloadWindow(viewingCert, certificateName.trim() || defaultVolunteerName)} className="flex items-center gap-2 px-6 py-2 bg-teal-700 text-white rounded-lg font-bold text-sm hover:bg-teal-600"><Download size={16}/> Save as PDF / Print</button>
                 <button className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 text-slate-600 dark:text-slate-200 rounded-lg font-bold text-sm"><Share2 size={16}/> Share to Profile</button>
              </div>
           </div>
        </div>
      )}

      <div className="mt-20 bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-12 text-white flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden shadow-2xl shadow-slate-900/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="md:w-1/3 shrink-0">
          <div className="aspect-square bg-white dark:bg-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-900 dark:text-white shadow-xl">
             <div className="text-8xl font-black text-teal-600 dark:text-teal-400 mb-2">14</div>
             <div className="text-xs font-black uppercase tracking-widest text-slate-400">United Nations SDG</div>
          </div>
        </div>
        <div className="flex-1 relative z-10">
           <h3 className="text-3xl font-bold mb-6">Global Impact Validation</h3>
           <p className="text-slate-400 text-lg leading-relaxed mb-8">
             Your achievements are logged on the OceanGuard ledger, directly contributing to national biodiversity reports. This record is immutable and serves as proof of high-impact environmental citizenship.
           </p>
           <button className="flex items-center gap-2 text-teal-400 font-bold text-lg hover:text-teal-300 transition-colors">
             Explore Global Leaderboard <ExternalLink size={20} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
