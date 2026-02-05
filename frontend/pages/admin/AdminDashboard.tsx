
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Trash2, Shield, Activity, Bell, FileText, ChevronRight, TrendingUp, Anchor } from 'lucide-react';

const data = [
  { name: 'Jan', plastic: 4.2, missions: 24 },
  { name: 'Feb', plastic: 3.8, missions: 18 },
  { name: 'Mar', plastic: 5.1, missions: 29 },
  { name: 'Apr', plastic: 6.4, missions: 32 },
  { name: 'May', plastic: 4.8, missions: 41 },
  { name: 'Jun', plastic: 7.2, missions: 38 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-widest mb-2">
              <Anchor size={14}/> Operational Headquarters
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Platform Command</h1>
            <p className="text-slate-500 font-medium mt-1">Global SDG-14 Marine Intelligence Overview</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
              <FileText size={18} /> Daily Export
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-xl transition-all active:scale-95">
              <Shield size={18} /> Zone Intervention
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<Trash2 />} label="Recovered Weight" value="842.5" unit="Tons" trend="+12.5%" trendUp color="blue" />
          <StatCard icon={<Users />} label="Active Force" value="5,821" unit="Members" trend="+3.2%" trendUp color="teal" />
          <StatCard icon={<Shield />} label="Safe Zones" value="142" unit="Regions" trend="Stable" color="amber" />
          <StatCard icon={<Activity />} label="Op Velocity" value="18" unit="Missions" trend="Peak" trendUp color="rose" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Plastic Volume Chart */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Plastic Recovery Performance</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Metric Tons / Month</p>
                </div>
                <div className="bg-slate-50 px-3 py-1 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-100 uppercase tracking-widest">Year: 2024</div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorPlastic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}} />
                    <Area type="monotone" dataKey="plastic" stroke="#0d9488" strokeWidth={4} fillOpacity={1} fill="url(#colorPlastic)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Mission Table Preview */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-slate-900 text-lg">Active High-Priority Missions</h3>
                <button className="text-teal-600 font-bold text-sm hover:underline flex items-center gap-1">View Command Center <ChevronRight size={16}/></button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <th className="pb-4">Operation ID</th>
                      <th className="pb-4">Lead Agency</th>
                      <th className="pb-4">Target Region</th>
                      <th className="pb-4">Force Size</th>
                      <th className="pb-4">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <MissionRow id="OP-238" agency="Ocean Guard" region="Palawan, PH" force="42" progress={68} />
                    <MissionRow id="OP-239" agency="Coral Watch" region="Cairns, AU" force="150" progress={12} />
                    <MissionRow id="OP-240" agency="Sea Rescue" region="Bali, ID" force="84" progress={94} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {/* Real-time Alerts */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-500" /> Live Intel Feed
                </h3>
                <span className="animate-pulse flex h-2 w-2 rounded-full bg-rose-500"></span>
              </div>
              <div className="space-y-6">
                <AlertItem type="urgent" title="Sudden Inflow - Cebu" time="12m ago" msg="Sensor network detected 400% surge in HDPE particles." />
                <AlertItem type="normal" title="Verify Required" time="48m ago" msg="5 citizen reports pending validation in Sector 4." />
                <AlertItem type="success" title="Extraction Sync" time="2h ago" msg="Facility_04 finalized P2F batch from Mission #212." />
              </div>
            </div>

            {/* SDG Progress Card */}
            <div className="bg-teal-900 text-white p-10 rounded-[2rem] shadow-2xl shadow-teal-900/40 relative overflow-hidden group">
               <Shield className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" />
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-4">SDG-14 Compliance</h3>
                 <p className="text-teal-100 text-sm leading-relaxed mb-10 opacity-80">
                   Operating at 94.2% efficiency relative to targeted cleanup goals. Force multiplier active for upcoming tidal surges.
                 </p>
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Quarterly Target</span>
                       <span className="text-2xl font-black">94%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-teal-400 rounded-full w-[94%] shadow-[0_0_20px_rgba(45,212,191,0.6)]"></div>
                    </div>
                 </div>
                 <button className="w-full mt-10 py-4 bg-white text-teal-900 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-teal-50 transition-colors shadow-lg shadow-teal-950">
                    Generate UN Report
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, unit, trend, trendUp, color }: any) => {
  const colorStyles: any = {
    blue: 'bg-blue-50 text-blue-600',
    teal: 'bg-teal-50 text-teal-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 rounded-2xl ${colorStyles[color]} shadow-inner`}>
          {React.cloneElement(icon as React.ReactElement, { size: 24 })}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[11px] font-black uppercase px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-500'}`}>
            {trendUp && <TrendingUp size={12}/>} {trend}
          </div>
        )}
      </div>
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{label}</span>
        <div className="flex items-baseline gap-2 mt-1">
          <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h4>
          <span className="text-sm font-bold text-slate-400">{unit}</span>
        </div>
      </div>
    </div>
  );
};

const MissionRow = ({ id, agency, region, force, progress }: any) => (
  <tr className="group">
    <td className="py-6 font-mono text-xs text-slate-400 group-hover:text-slate-900 transition-colors font-bold">{id}</td>
    <td className="py-6 font-bold text-slate-800 text-sm">{agency}</td>
    <td className="py-6 font-bold text-slate-500 text-sm">{region}</td>
    <td className="py-6 font-black text-slate-800 text-sm">{force}</td>
    <td className="py-6">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
           <div className={`h-full ${progress > 90 ? 'bg-teal-500' : 'bg-amber-500'} rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
        <span className="text-[10px] font-black text-slate-500">{progress}%</span>
      </div>
    </td>
  </tr>
);

const AlertItem = ({ type, title, time, msg }: any) => {
  const styles: any = {
    urgent: 'border-l-rose-500 bg-rose-50/20',
    normal: 'border-l-blue-500 bg-blue-50/20',
    success: 'border-l-teal-500 bg-teal-50/20',
  };
  return (
    <div className={`p-5 rounded-2xl border-l-4 ${styles[type]} shadow-sm transition-all hover:scale-[1.02] cursor-pointer`}>
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{title}</h4>
        <span className="text-[9px] font-bold text-slate-400 uppercase">{time}</span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed font-medium">{msg}</p>
    </div>
  );
};

export default AdminDashboard;
