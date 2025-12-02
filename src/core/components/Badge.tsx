import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../theme/theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

const getVariantColor = (variant: BadgeProps['variant']) => {
  switch (variant) {
    case 'success':
      return { bg: Colors.success, text: Colors.background };
    case 'error':
      return { bg: Colors.error, text: Colors.text };
    case 'warning':
      return { bg: Colors.warning, text: Colors.background };
    case 'info':
      return { bg: Colors.accent, text: Colors.background };
    default:
      return { bg: Colors.primary, text: Colors.text };
  }
};

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
}) => {
  const { bg, text } = getVariantColor(variant);
  const padding = size === 'sm' ? Spacing.sm : size === 'lg' ? Spacing.lg : Spacing.md;
  const fontSize = size === 'sm' ? Typography.caption : size === 'lg' ? Typography.body : Typography.bodySmall;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bg,
          paddingHorizontal: padding,
          paddingVertical: padding / 2,
        },
      ]}
    >
      <Text
        style={{
          color: text,
          fontSize,
          fontWeight: Typography.semibold as any,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
});

export default Badge;
