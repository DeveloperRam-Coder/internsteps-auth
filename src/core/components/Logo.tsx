import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Spacing } from '../theme/theme';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  animated = false,
  showText = false 
}) => {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [animated]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const sizes = {
    sm: { logo: 60, letter: 30, text: 16 },
    md: { logo: 80, letter: 40, text: 20 },
    lg: { logo: 100, letter: 50, text: 24 },
    xl: { logo: 120, letter: 60, text: 28 },
  };

  const { logo: logoSize, letter: letterSize, text: textSize } = sizes[size];

  const logoContainer = (
    <View
      style={[
        styles.logo,
        {
          width: logoSize,
          height: logoSize,
          borderRadius: logoSize / 2,
          borderWidth: size === 'xl' ? 3 : 2,
        },
      ]}
    >
      <View style={styles.logoContent}>
        <Text
          style={[
            styles.logoLetter,
            {
              fontSize: letterSize,
            },
          ]}
        >
          S
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {animated ? (
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ rotate: spin }],
            },
          ]}
        >
          {logoContainer}
        </Animated.View>
      ) : (
        <View style={styles.logoContainer}>{logoContainer}</View>
      )}
      {showText && (
        <Text
          style={[
            styles.logoText,
            {
              fontSize: textSize,
            },
          ]}
        >
          InternSteps
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: Spacing.md,
  },
  logo: {
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
  },
  logoContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoLetter: {
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
  },
  logoText: {
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 1,
  },
});

export default Logo;
