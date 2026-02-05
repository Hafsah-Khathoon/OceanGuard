import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { VolunteerSignup, CitizenReportEntry } from '../types';

const STORAGE_KEYS = {
  VOLUNTEERS: 'oceanguard_volunteers',
  REPORTS: 'oceanguard_citizen_reports',
  COMPLETIONS: 'oceanguard_mission_completions',
};

interface OceanGuardState {
  volunteers: VolunteerSignup[];
  citizenReports: CitizenReportEntry[];
  completedMissionIdsByUser: Record<string, string[]>;
}

interface OceanGuardContextValue extends OceanGuardState {
  addVolunteer: (v: Omit<VolunteerSignup, 'id' | 'createdAt'>) => void;
  addCitizenReport: (r: Omit<CitizenReportEntry, 'id' | 'date'> & { date?: string }) => void;
  completeMissionForUser: (userId: string, missionId: string) => void;
  hasUserCompletedMission: (userId: string, missionId: string) => boolean;
}

const defaultState: OceanGuardState = {
  volunteers: [],
  citizenReports: [],
  completedMissionIdsByUser: {},
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch (_) {}
  return fallback;
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_) {}
}

const OceanGuardContext = createContext<OceanGuardContextValue | null>(null);

export function OceanGuardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OceanGuardState>(() => ({
    volunteers: loadFromStorage(STORAGE_KEYS.VOLUNTEERS, defaultState.volunteers),
    citizenReports: loadFromStorage(STORAGE_KEYS.REPORTS, defaultState.citizenReports),
    completedMissionIdsByUser: loadFromStorage(STORAGE_KEYS.COMPLETIONS, defaultState.completedMissionIdsByUser),
  }));

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.VOLUNTEERS, state.volunteers);
  }, [state.volunteers]);
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.REPORTS, state.citizenReports);
  }, [state.citizenReports]);
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.COMPLETIONS, state.completedMissionIdsByUser);
  }, [state.completedMissionIdsByUser]);

  const addVolunteer = useCallback((v: Omit<VolunteerSignup, 'id' | 'createdAt'>) => {
    const id = `vol-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const createdAt = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      volunteers: [...prev.volunteers, { ...v, id, createdAt }],
    }));
  }, []);

  const addCitizenReport = useCallback((r: Omit<CitizenReportEntry, 'id' | 'date'> & { date?: string }) => {
    const id = `rep-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const date = r.date ?? new Date().toISOString();
    setState((prev) => ({
      ...prev,
      citizenReports: [...prev.citizenReports, { ...r, id, date }],
    }));
  }, []);

  const completeMissionForUser = useCallback((userId: string, missionId: string) => {
    setState((prev) => {
      const list = prev.completedMissionIdsByUser[userId] ?? [];
      if (list.includes(missionId)) return prev;
      return {
        ...prev,
        completedMissionIdsByUser: {
          ...prev.completedMissionIdsByUser,
          [userId]: [...list, missionId],
        },
      };
    });
  }, []);

  const hasUserCompletedMission = useCallback(
    (userId: string, missionId: string) => {
      const list = state.completedMissionIdsByUser[userId] ?? [];
      return list.includes(missionId);
    },
    [state.completedMissionIdsByUser]
  );

  const value: OceanGuardContextValue = {
    ...state,
    addVolunteer,
    addCitizenReport,
    completeMissionForUser,
    hasUserCompletedMission,
  };

  return (
    <OceanGuardContext.Provider value={value}>
      {children}
    </OceanGuardContext.Provider>
  );
}

export function useOceanGuard() {
  const ctx = useContext(OceanGuardContext);
  if (!ctx) throw new Error('useOceanGuard must be used within OceanGuardProvider');
  return ctx;
}
