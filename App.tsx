import React from 'react';
import { AuthProvider } from './src/modules/auth/context/AuthContext';
import { ThemeProvider } from './src/core/theme/ThemeContext';
import RootNavigator from './src/core/navigation';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
