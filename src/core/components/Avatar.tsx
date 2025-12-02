import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../theme/theme';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  source?: ImageSourcePropType;
  size?: AvatarSize;
  initials?: string;
  color?: string;
}

const getSize = (size: AvatarSize) => {
  switch (size) {
    case 'sm':
      return 40;
    case 'lg':
      return 80;
    case 'xl':
      return 100;
    default:
      return 60;
  }
};

const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 'md',
  initials = '?',
  color = Colors.primary,
}) => {
  const sizeValue = getSize(size);

  return (
    <View
      style={[
        styles.avatar,
        {
          width: sizeValue,
          height: sizeValue,
          borderRadius: sizeValue / 2,
          backgroundColor: color,
        },
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={{
            width: sizeValue,
            height: sizeValue,
            borderRadius: sizeValue / 2,
          }}
        />
      ) : (
        <Text style={styles.initials}>{initials}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
  },
  initials: {
    color: Colors.text,
    fontWeight: Typography.bold as any,
    fontSize: Typography.h5,
  },
});

export default Avatar;
