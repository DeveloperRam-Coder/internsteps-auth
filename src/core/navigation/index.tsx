import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../modules/auth/context/AuthContext';
import LoginScreen from '../../modules/auth/screens/LoginScreen';
import RegisterScreen from '../../modules/auth/screens/RegisterScreen';
import ProfileScreen from '../../modules/auth/screens/ProfileScreen';
import SplashScreen from '../../modules/auth/screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext missing');
  const { user, loading } = auth;

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Profile" component={ProfileScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
