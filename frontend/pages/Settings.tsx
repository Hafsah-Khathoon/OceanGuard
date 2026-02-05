import React from 'react';
import { Settings as SettingsIcon, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <SettingsIcon className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Customize your experience. Layout stays the same; only colors change with theme.</p>
      </header>

      <section className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-600 p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Appearance</h2>
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="font-medium text-slate-700 dark:text-slate-200">Theme</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark. Layout is unchanged.</p>
          </div>
          <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 p-1">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                theme === 'light'
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Sun size={18} /> Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                theme === 'dark'
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Moon size={18} /> Dark
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
