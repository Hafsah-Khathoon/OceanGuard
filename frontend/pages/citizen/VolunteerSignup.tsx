import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, CheckCircle2 } from 'lucide-react';
import { useOceanGuard } from '../../context/OceanGuardContext';

const VolunteerSignup: React.FC = () => {
  const { addVolunteer } = useOceanGuard();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !contact.trim()) return;
    setLoading(true);
    addVolunteer({ name: name.trim(), email: email.trim(), contact: contact.trim() });
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-teal-600/10">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">You're on the list</h1>
        <p className="text-slate-600 text-lg mb-10 leading-relaxed">
          Your details have been added to our volunteer roster. We'll reach out when missions match your area and skills.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-teal-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-800 transition-all shadow-lg"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Become a Volunteer</h1>
        <p className="text-slate-500 font-medium">Join professional cleanup missions. Share your details to get started.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500/20"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500/20"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Contact (phone or other)</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500/20"
            placeholder="Phone number or contact"
            required
          />
        </div>
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all shadow-lg disabled:opacity-70"
          >
            {loading ? <span className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" /> : <Users size={20} />}
            {loading ? 'Submitting…' : 'Join as Volunteer'}
          </button>
          <Link
            to="/"
            className="px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default VolunteerSignup;
