import React, { useState, useMemo } from 'react';
import { CheckCircle, XCircle, MapPin, Calendar, Image as ImageIcon, Download } from 'lucide-react';
import { MOCK_REPORTS } from '../../constants';
import { useOceanGuard } from '../../context/OceanGuardContext';

type ReportStatus = 'Pending' | 'Verified' | 'Resolved' | 'Invalid';

interface ReportItem {
  id: string;
  type: string;
  location: string;
  severity: string;
  status: ReportStatus;
  submittedAt: string;
  imageUrl: string | null;
}

const Verification: React.FC = () => {
  const { citizenReports } = useOceanGuard();
  const [statusOverrides, setStatusOverrides] = useState<Record<string, ReportStatus>>({});

  const allReports = useMemo((): ReportItem[] => {
    const mock: ReportItem[] = MOCK_REPORTS.map((r) => ({
      id: r.id,
      type: r.type,
      location: r.location,
      severity: r.severity,
      status: (statusOverrides[r.id] ?? r.status) as ReportStatus,
      submittedAt: '4h ago',
      imageUrl: null,
    }));
    const citizen: ReportItem[] = citizenReports.map((r) => ({
      id: r.id,
      type: r.plasticType || 'Reported',
      location: r.location.address || `${r.location.lat.toFixed(4)}, ${r.location.lng.toFixed(4)}`,
      severity: r.severity,
      status: statusOverrides[r.id] ?? 'Pending',
      submittedAt: r.date ? new Date(r.date).toLocaleString() : 'Recently',
      imageUrl: r.imageUrl || null,
    }));
    return [...citizen, ...mock];
  }, [citizenReports, statusOverrides]);

  const setStatus = (reportId: string, status: ReportStatus) => {
    setStatusOverrides((prev) => ({ ...prev, [reportId]: status }));
  };

  const downloadReport = (report: ReportItem) => {
    const win = window.open('', '_blank', 'width=700,height=900');
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html><html><head><title>Report ${report.id}</title>
      <style>body{font-family:Inter,sans-serif;padding:2rem;max-width:600px;margin:0 auto;background:#f8fafc;color:#1e293b}
      h1{font-size:1.5rem;margin-bottom:1.5rem}
      .field{margin-bottom:1rem}
      .label{font-size:0.7rem;font-weight:bold;color:#64748b;text-transform:uppercase;letter-spacing:0.05em}
      .value{font-size:1rem;margin-top:0.25rem}
      img{max-width:100%;border-radius:12px;margin:1rem 0}
      .status{display:inline-block;padding:0.25rem 0.5rem;border-radius:6px;font-size:0.75rem;font-weight:bold;margin-bottom:1rem}
      .status.pending{background:#fef3c7;color:#b45309}
      .status.verified{background:#ccfbf1;color:#0f766e}
      .status.invalid{background:#fee2e2;color:#b91c1c}
      .status.resolved{background:#e2e8f0;color:#475569}
      .no-print{margin-top:1.5rem}
      @media print{.no-print{display:none}}</style></head><body>
      <h1>OceanGuard – Pollution Report</h1>
      <div class="status ${report.status.toLowerCase()}">${report.status}</div>
      <div class="field"><div class="label">Report ID</div><div class="value">${report.id}</div></div>
      <div class="field"><div class="label">Pollution Type</div><div class="value">${report.type}</div></div>
      <div class="field"><div class="label">Location</div><div class="value">${report.location}</div></div>
      <div class="field"><div class="label">Severity</div><div class="value">${report.severity}</div></div>
      <div class="field"><div class="label">Submitted</div><div class="value">${report.submittedAt}</div></div>
      ${report.imageUrl ? `<div class="field"><div class="label">Evidence</div><img src="${report.imageUrl}" alt="Report evidence" /></div>` : ''}
      <p class="no-print"><button onclick="window.print()" style="padding:0.5rem 1rem;background:#0d9488;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer">Print / Save as PDF</button></p>
      </body></html>
    `);
    win.document.close();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Report Verification Queue</h1>
        <p className="text-slate-500 dark:text-slate-400">Audit citizen reports and prioritize them for NGO action.</p>
      </header>

      <div className="space-y-6">
        {allReports.map((report) => {
          const canVerify = report.status === 'Pending';
          const canFlag = report.status !== 'Invalid';

          return (
            <div key={report.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-600 overflow-hidden shadow-sm flex flex-col md:flex-row">
              <div className="md:w-56 h-48 md:h-auto bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 shrink-0 overflow-hidden">
                {report.imageUrl ? (
                  <img src={report.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={40} strokeWidth={1} />
                )}
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                      report.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                      report.status === 'Verified' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' :
                      report.status === 'Invalid' ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300' :
                      'bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}>
                      {report.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500 tracking-tighter">ID: {report.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{report.type}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {report.location}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {report.submittedAt}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setStatus(report.id, 'Verified')}
                    disabled={!canVerify}
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-xl font-bold hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle size={18} /> Verify Report
                  </button>
                  <button
                    onClick={() => setStatus(report.id, 'Invalid')}
                    disabled={!canFlag}
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-xl font-bold hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle size={18} /> Flag as Invalid
                  </button>
                  <button
                    onClick={() => downloadReport(report)}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Download size={18} /> Download Report
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Verification;
