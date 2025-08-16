import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from 'src/auth/AuthContext';

const App: React.FC = () => {
  const colorScheme = useColorScheme();
  
  return (
    <AuthProvider>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;