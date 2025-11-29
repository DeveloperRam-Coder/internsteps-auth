import React from 'react';
import { AuthProvider } from './src/modules/auth/context/AuthContext';
import RootNavigator from './src/core/navigation';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
