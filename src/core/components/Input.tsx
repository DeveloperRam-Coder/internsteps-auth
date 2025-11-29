import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

const Input = (props: TextInputProps) => {
  return <TextInput style={styles.input} {...props} />;
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
});
