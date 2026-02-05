
import React from 'react';
import { Users, Calendar, MapPin, Search, Filter, Plus, FileText, Image } from 'lucide-react';
import { useOceanGuard } from '../../context/OceanGuardContext';

const Operations: React.FC = () => {
  const { volunteers, citizenReports } = useOceanGuard();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Cleanup Operations</h1>
          <p className="text-slate-500">Deploy resources, manage logistics, and track real-time recovery progress.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" />
            <span className="text-sm font-bold text-teal-800">{volunteers.length} Volunteers Registered</span>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-teal-700 text-white rounded-xl font-bold hover:bg-teal-800 shadow-lg transition-all">
            <Plus size={18} /> New Operation
          </button>
        </div>
      </header>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input type="text" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20" placeholder="Search by region, ID, or lead..." />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">
             <Filter size={16} /> Filter
           </button>
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-semibold text-slate-900 hover:bg-slate-200">
             Sort: Date
           </button>
        </div>
      </div>

      {/* Citizen Reporter – live reports */}
      {citizenReports.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-teal-600" /> New Reports from Citizen Reporter
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {citizenReports.slice(0, 9).map((r) => (
              <div key={r.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex gap-4">
                {r.imageUrl ? (
                  <img src={r.imageUrl} alt="Report" className="w-20 h-20 rounded-lg object-cover shrink-0" />
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Image size={24} className="text-slate-400" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      r.severity === 'Critical' ? 'bg-rose-100 text-rose-700' :
                      r.severity === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'
                    }`}>
                      {r.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate" title={r.location.address || `${r.location.lat}, ${r.location.lng}`}>
                    {r.location.address || `${r.location.lat.toFixed(4)}, ${r.location.lng.toFixed(4)}`}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                    {new Date(r.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 gap-6">
        <OpCard 
          status="Active" 
          title="Operation Blue Horizon" 
          location="Phuket Archipelago, Thailand" 
          volunteers={42} 
          date="Oct 12 - Oct 28" 
          progress={68}
        />
        <OpCard 
          status="Planning" 
          title="Great Reef Scour" 
          location="Cairns Sector, Australia" 
          volunteers={150} 
          date="Nov 05 - Nov 12" 
          progress={0}
        />
        <OpCard 
          status="Completed" 
          title="Nile Delta Extraction" 
          location="Damietta, Egypt" 
          volunteers={84} 
          date="Sept 14 - Sept 20" 
          progress={100}
        />
      </div>

      {volunteers.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Users size={20} className="text-teal-600" /> Volunteer Roster (from Become a Volunteer)
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 font-bold text-slate-600 uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-3 font-bold text-slate-600 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3 font-bold text-slate-600 uppercase tracking-wider">Contact</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((v) => (
                  <tr key={v.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-6 py-3 font-medium text-slate-800">{v.name}</td>
                    <td className="px-6 py-3 text-slate-600">{v.email}</td>
                    <td className="px-6 py-3 text-slate-600">{v.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

const OpCard = ({ status, title, location, volunteers, date, progress }: any) => {
  const statusColors: any = {
    Active: 'bg-teal-100 text-teal-700 border-teal-200',
    Planning: 'bg-blue-100 text-blue-700 border-blue-200',
    Completed: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center gap-8 shadow-sm hover:shadow-md transition-all">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${statusColors[status]}`}>
            {status}
          </span>
          <span className="text-xs font-bold text-slate-400">#OP-932-B</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
          <span className="flex items-center gap-1.5"><MapPin size={16} className="text-teal-600" /> {location}</span>
          <span className="flex items-center gap-1.5"><Calendar size={16} className="text-teal-600" /> {date}</span>
          <span className="flex items-center gap-1.5"><Users size={16} className="text-teal-600" /> {volunteers} Personnel</span>
        </div>
      </div>

      <div className="lg:w-72 space-y-3">
        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
          <span>Target Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-teal-600 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold text-slate-700 transition-colors">
            Details
          </button>
          <button className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-bold text-white transition-colors">
            {status === 'Planning' ? 'Deploy' : 'Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Operations;
