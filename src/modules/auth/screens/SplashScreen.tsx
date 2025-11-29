import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/placeholder.png')} style={styles.logo} />
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});
