'use client';

import { UserSettingsProvider } from '@/contexts/UserSettingsContext';

export default function UserSettingsProviderWrapper({ children }) {
  return (
    <UserSettingsProvider>
      {children}
    </UserSettingsProvider>
  );
}
