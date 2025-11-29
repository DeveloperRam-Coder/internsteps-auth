import React, { useState, useContext } from 'react';
import { View, Text, Alert, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import Input from '../../../core/components/Input';
import Button from '../../../core/components/Button';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext missing');
  const { login } = auth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await login(email, password);
    } catch (e: any) {
      const msg = e?.response?.data?.message || e.message || 'Login failed';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Image source={require('../../../../assets/placeholder.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome back</Text>
        <View style={styles.inputContainer}>
          <Input placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
          <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        </View>
        <Button title="Login" onPress={onSubmit} disabled={loading} />
        <Button title="Create an account" onPress={() => navigation.navigate('Register')} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
});
