import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../theme/theme';

interface DividerProps {
  vertical?: boolean;
  spacing?: number;
}

const Divider: React.FC<DividerProps> = ({ vertical = false, spacing = Spacing.md }) => {
  return vertical ? (
    <View style={[styles.dividerVertical, { width: spacing }]} />
  ) : (
    <View style={[styles.dividerHorizontal, { marginVertical: spacing }]} />
  );
};

const styles = StyleSheet.create({
  dividerHorizontal: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  dividerVertical: {
    height: '100%',
    backgroundColor: Colors.divider,
  },
});

export default Divider;
