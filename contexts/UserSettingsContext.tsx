'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { getUserSettings, updateSelectedParish } from '@/lib/actions/userSettings';

interface UserSettingsProviderProps {
  children: ReactNode;
}

interface UserSettingsContextType {
  selectedParish: string | null;
  isLoading: boolean;
  updateParish: (parishId: string | null) => Promise<{ error: string | null }>;
  refreshSettings: () => Promise<void>;
}

const UserSettingsContext = createContext<UserSettingsContextType>({
  selectedParish: null,
  isLoading: true,
  updateParish: async () => ({ error: 'Context not initialized' }),
  refreshSettings: async () => {}
});

export const UserSettingsProvider = ({ children }: UserSettingsProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedParish, setSelectedParish] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to refresh settings
  const refreshSettings = async (): Promise<void> => {
    if (!user) {
      setSelectedParish(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await getUserSettings(user.id);
      
      if (error) throw error;
      
      setSelectedParish(data?.selected_parish_id || null);
    } catch (error) {
      console.error('Failed to fetch user settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Set up auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await refreshSettings();
      } else {
        setSelectedParish(null);
        setIsLoading(false);
      }
    });

    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await refreshSettings();
      } else {
        setIsLoading(false);
      }
    };
    
    getUser();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Function to update the selected parish
  const updateParish = async (parishId: string | null): Promise<{ error: string | null }> => {
    if (!user) return { error: 'User not authenticated' };
    
    try {
      const { error } = await updateSelectedParish(user.id, parishId);
      if (error) throw error;
      
      setSelectedParish(parishId);
      return { error: null };
    } catch (error) {
      console.error('Failed to update parish:', error);
      return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
  };

  return (
    <UserSettingsContext.Provider 
      value={{
        selectedParish,
        isLoading,
        updateParish,
        refreshSettings
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

// Custom hook to use the user settings
export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (context === undefined) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider');
  }
  return context;
};
