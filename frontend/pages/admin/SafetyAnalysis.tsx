
import React from 'react';
import { Activity, Thermometer, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';

const SafetyAnalysis: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Plastic-to-Fuel (P2F) Safety Analysis</h1>
        <p className="text-slate-500">Advanced pyrolysis monitoring and chemical stability auditing.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="text-teal-600" /> Current Batch Stability
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-full aspect-square bg-teal-50 rounded-2xl flex flex-col items-center justify-center mb-3">
                  <Thermometer className="text-teal-600 mb-1" />
                  <span className="text-2xl font-bold text-teal-800">420°C</span>
                </div>
                <span className="text-xs font-bold text-slate-500">PYROLYSIS TEMP</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square bg-teal-50 rounded-2xl flex flex-col items-center justify-center mb-3">
                  <ShieldCheck className="text-teal-600 mb-1" />
                  <span className="text-2xl font-bold text-teal-800">98.2%</span>
                </div>
                <span className="text-xs font-bold text-slate-500">PURITY RATING</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square bg-blue-50 rounded-2xl flex flex-col items-center justify-center mb-3">
                  <Zap className="text-blue-600 mb-1" />
                  <span className="text-2xl font-bold text-blue-800">1.2MW</span>
                </div>
                <span className="text-xs font-bold text-slate-500">ENERGY OUTPUT</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square bg-amber-50 rounded-2xl flex flex-col items-center justify-center mb-3">
                  <AlertTriangle className="text-amber-600 mb-1" />
                  <span className="text-2xl font-bold text-amber-800">0.02</span>
                </div>
                <span className="text-xs font-bold text-slate-500">EMISSION RATIO</span>
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl text-white">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold">Chemical Composition Map</h4>
                <span className="text-xs text-teal-400 font-mono">LIVE FEED: FACILITY_04</span>
              </div>
              <div className="space-y-4">
                <CompositionBar label="Polyethylene (PE)" percent={65} color="bg-teal-500" />
                <CompositionBar label="Polypropylene (PP)" percent={22} color="bg-blue-500" />
                <CompositionBar label="Polystyrene (PS)" percent={8} color="bg-indigo-500" />
                <CompositionBar label="PVC (Critical Limit)" percent={5} color="bg-rose-500" />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Operational Risk Assessment</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-100 pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <th className="py-3">Risk Factor</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Mitigation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="text-sm">
                  <td className="py-4 font-semibold">Feedstock Contamination</td>
                  <td className="py-4"><span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-bold">Low</span></td>
                  <td className="py-4 text-slate-500">Secondary optical sorting active</td>
                </tr>
                <tr className="text-sm">
                  <td className="py-4 font-semibold">Gaseous Emissions</td>
                  <td className="py-4"><span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-bold">Monitor</span></td>
                  <td className="py-4 text-slate-500">Check catalytic converter pressure</td>
                </tr>
                <tr className="text-sm">
                  <td className="py-4 font-semibold">Residue Management</td>
                  <td className="py-4"><span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-bold">Optimal</span></td>
                  <td className="py-4 text-slate-500">Char output being brick-compacted</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
             <h4 className="font-bold text-slate-800 mb-4">Sustainability ROI</h4>
             <div className="space-y-6">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-teal-600 font-bold">8.4x</div>
                 <div>
                   <div className="text-sm font-bold text-slate-800">Energy Return</div>
                   <div className="text-xs text-slate-500">Per ton of marine plastic</div>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 font-bold">-$420</div>
                 <div>
                   <div className="text-sm font-bold text-slate-800">Carbon Offset</div>
                   <div className="text-xs text-slate-500">In value per batch</div>
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-teal-700 p-8 rounded-3xl text-white shadow-xl">
            <h4 className="text-lg font-bold mb-4">Certified Safe Facility</h4>
            <p className="text-sm text-teal-100 leading-relaxed mb-6">
              This facility operates under ISO 14001:2015 standards and is audited by the Global Energy Council for P2F safety.
            </p>
            <div className="flex gap-2">
              <div className="w-10 h-10 border border-teal-500 rounded flex items-center justify-center text-[10px] font-bold">ISO</div>
              <div className="w-10 h-10 border border-teal-500 rounded flex items-center justify-center text-[10px] font-bold">SDG14</div>
              <div className="w-10 h-10 border border-teal-500 rounded flex items-center justify-center text-[10px] font-bold">GEPA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompositionBar = ({ label, percent, color }: any) => (
  <div>
    <div className="flex justify-between text-xs font-bold mb-1">
      <span>{label}</span>
      <span>{percent}%</span>
    </div>
    <div className="h-1.5 bg-slate-800 rounded-full">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

export default SafetyAnalysis;
