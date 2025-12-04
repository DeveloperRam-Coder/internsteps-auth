import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../modules/auth/context/AuthContext';
import LoginScreen from '../../modules/auth/screens/LoginScreen';
import RegisterScreen from '../../modules/auth/screens/RegisterScreen';
import ProfileScreen from '../../modules/auth/screens/ProfileScreen';
import SplashScreen from '../../modules/auth/screens/SplashScreen';
import OnboardingScreen from '../../modules/auth/screens/OnboardingScreen';
import BusinessDetailsScreen from '../../modules/auth/screens/BusinessDetailsScreen';
import AddCustomerScreen from '../../modules/auth/screens/AddCustomerScreen';
import AddSubCustomerScreen from '../../modules/auth/screens/AddSubCustomerScreen';
import AdminDashboard from '../../modules/admin/AdminDashboard';
import InstructorDashboard from '../../modules/instructor/InstructorDashboard';
import UserDashboard from '../../modules/user/UserDashboard';
import { Colors, Typography } from '../theme/theme';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext missing');
  const { user, loading, hasBusinessDetails } = auth;

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.surface,
          },
          headerTintColor: Colors.text,
          headerTitleStyle: {
            fontWeight: Typography.bold as any,
            fontSize: 18,
            color: Colors.text,
          },
          headerBackTitle: '',
        }}
      >
        {user ? (
          <>
            {/* Business Details Flow - Show if no business details exist */}
            {!hasBusinessDetails ? (
              <>
                <Stack.Screen 
                  name="BusinessDetails" 
                  component={BusinessDetailsScreen}
                  options={{
                    title: 'Business Details',
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                  }}
                />
                <Stack.Screen 
                  name="AddCustomer" 
                  component={AddCustomerScreen}
                  options={{
                    title: 'Add Customer',
                    headerTitleAlign: 'center',
                    headerBackVisible: false,
                  }}
                />
              </>
            ) : (
              <>
                {/* Role-based dashboards - Show when business details exist */}
                {user.role === 'admin' && (
                  <Stack.Screen 
                    name="AdminDashboard" 
                    component={AdminDashboard}
                    options={{
                      title: 'Admin Dashboard',
                      headerTitleAlign: 'left',
                    }}
                  />
                )}
                {user.role === 'instructor' && (
                  <Stack.Screen 
                    name="InstructorDashboard" 
                    component={InstructorDashboard}
                    options={{
                      title: 'Teaching Dashboard',
                      headerTitleAlign: 'left',
                    }}
                  />
                )}
                {(!user.role || user.role === 'user') && (
                  <Stack.Screen 
                    name="UserDashboard" 
                    component={UserDashboard}
                    options={{
                      title: 'My Dashboard',
                      headerTitleAlign: 'left',
                    }}
                  />
                )}
                
                {/* Add Customer screen - accessible from dashboard */}
                <Stack.Screen 
                  name="AddCustomer" 
                  component={AddCustomerScreen}
                  options={{
                    title: 'Add Customer',
                    headerTitleAlign: 'center',
                  }}
                />

                {/* Add SubCustomer screen - accessible from dashboard */}
                <Stack.Screen 
                  name="AddSubCustomerScreen" 
                  component={AddSubCustomerScreen}
                  options={{
                    title: 'Add Sub-Customer',
                    headerTitleAlign: 'center',
                  }}
                />
              </>
            )}
            
            {/* Profile screen accessible to all authenticated users */}
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{
                title: 'My Profile',
                headerTitleAlign: 'left',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Onboarding" 
              component={OnboardingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Auth" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{
                title: 'Create Account',
                headerTitleAlign: 'center',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}