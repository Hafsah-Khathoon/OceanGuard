
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../constants';
import { Camera, Map, Users, Info, ArrowRight } from 'lucide-react';

const CitizenHome: React.FC = () => {
  const [pollutionImgError, setPollutionImgError] = useState(false);
  const pollutionImgSrc = pollutionImgError ? IMAGES.POLLUTION_FALLBACK : IMAGES.POLLUTION;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Welcome, Guardian.</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
          Your reports help us identify and track plastic pollution hotspots. Together, we can restore the health of our oceans.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <HomeActionCard 
          title="Report Plastic" 
          desc="Spotted pollution? Upload a photo and location."
          icon={<Camera className="w-8 h-8" />}
          link="/report"
          color="bg-blue-600"
        />
        <HomeActionCard 
          title="Ocean Map" 
          desc="View active pollution sites around the world."
          icon={<Map className="w-8 h-8" />}
          link="/map"
          color="bg-teal-600"
        />
        <HomeActionCard 
          title="Nearby NGOs" 
          desc="Find organizations working near your area."
          icon={<Info className="w-8 h-8" />}
          link="/ngos"
          color="bg-slate-800"
        />
        <HomeActionCard 
          title="Become a Volunteer" 
          desc="Level up and join professional cleanup missions."
          icon={<Users className="w-8 h-8" />}
          link="/volunteer-signup"
          color="bg-amber-600"
        />
      </div>

      <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 mb-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Real-Time Impact</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Every report you submit is verified by our NGO network. This data feeds into global SDG-14 reporting metrics, helping policy makers understand the scale of marine debris in real-time.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="block text-4xl font-bold text-teal-700">82%</span>
                <span className="text-sm font-semibold text-slate-400 uppercase">Verification Rate</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-teal-700">12m+</span>
                <span className="text-sm font-semibold text-slate-400 uppercase">Points of Data</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src={pollutionImgSrc}
              onError={() => setPollutionImgError(true)}
              className="rounded-2xl shadow-2xl object-cover h-64 w-full min-h-[16rem] bg-slate-100 dark:bg-slate-700"
              alt="Plastic pollution in ocean – marine debris documentary"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Education & Conservation</h3>
          <button className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All Resources <ArrowRight size={18} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <ArticleCard 
            img={IMAGES.WILDLIFE} 
            title="The Impact on Marine Wildlife" 
            tag="Conservation"
          />
          <ArticleCard 
            img={IMAGES.CORAL} 
            title="Coral Reef Recovery Strategies" 
            tag="Science"
          />
          <ArticleCard 
            img={IMAGES.CLEANUP} 
            title="Proper Microplastic Disposal" 
            tag="Guidelines"
          />
        </div>
      </section>
    </div>
  );
};

const HomeActionCard = ({ title, desc, icon, link, color }: any) => (
  <Link to={link} className="group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
  </Link>
);

const ArticleCard = ({ img, title, tag }: any) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform">
    <img src={img} className="w-full h-48 object-cover" alt={title} />
    <div className="p-6">
      <span className="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-[10px] font-bold uppercase rounded-full mb-3">{tag}</span>
      <h4 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">{title}</h4>
    </div>
  </div>
);

export default CitizenHome;
