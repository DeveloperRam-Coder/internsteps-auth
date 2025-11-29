import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & { title: string };

const Button = ({ title, ...props }: Props) => {
  return (
    <TouchableOpacity style={styles.btn} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#0B6EFD',
    padding: 14,
    borderRadius: 8,
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
