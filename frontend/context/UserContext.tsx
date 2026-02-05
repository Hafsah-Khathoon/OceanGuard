import React, { createContext, useContext } from 'react';
import { User } from '../types';

const UserContext = createContext<User | null>(null);

export function UserProvider({ user, children }: { user: User | null; children: React.ReactNode }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser(): User | null {
  return useContext(UserContext);
}
