import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../theme/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  title?: string;
  padding?: boolean;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  padding = true,
  gradient = false,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        styles.card,
        gradient && styles.cardGradient,
        padding && styles.cardPadding,
        style,
      ]}
      {...props}
    >
      {title && <Text style={styles.cardTitle}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.md,
    ...Shadows.md,
    overflow: 'hidden',
  },
  cardGradient: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardPadding: {
    padding: Spacing.lg,
  },
  cardTitle: {
    fontSize: Typography.h6,
    fontWeight: Typography.bold as any,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
});

export default Card;
