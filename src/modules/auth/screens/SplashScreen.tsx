import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  useColorScheme,
  Image,
} from 'react-native';
import { Colors, Typography, Spacing } from '../../../core/theme/theme';

export default function SplashScreen({ navigation }: any) {
  
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
    ]).start();

    // Navigate after 2.5 seconds (splash screen standard duration)
    const timer = setTimeout(() => {
      navigation?.replace('Auth');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      {/* Animated Background Gradient Effect */}
      <View
        style={[
          styles.backgroundGradient,
          { backgroundColor: Colors.background },
        ]}
      />

      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo Container */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <View
            style={[
              styles.logo,
              {
                backgroundColor: Colors.surfaceLight,
                borderColor: Colors.primary,
              },
            ]}
          >
            {/* Logo using Image - InternSteps Logo */}
            <View style={styles.logoContent}>
              <Text style={styles.logoLetter}>S</Text>
            </View>
          </View>
        </Animated.View>

        {/* Title */}
        <Text style={[styles.title, { color: Colors.text }]}>
          InternSteps
        </Text>
        <Text style={[styles.subtitle, { color: Colors.textSecondary }]}>
          Your Learning Journey Starts Here
        </Text>

        {/* Loading Indicator with Animation */}
        <View style={styles.loaderContainer}>
          <View style={[styles.loaderDot, { backgroundColor: Colors.primary }]} />
          <View
            style={[
              styles.loaderDot,
              {
                backgroundColor: Colors.primary,
                opacity: 0.6,
              },
            ]}
          />
          <View
            style={[
              styles.loaderDot,
              {
                backgroundColor: Colors.primary,
                opacity: 0.3,
              },
            ]}
          />
        </View>

        {/* Loading Text */}
        <Text
          style={[styles.loadingText, { color: Colors.textSecondary }]}
        >
          Initializing your experience...
        </Text>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text
          style={[styles.footerText, { color: Colors.textSecondary }]}
        >
          © 2025 InternSteps
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRight: {
    position: 'absolute',
    top: Spacing.xl,
    right: Spacing.xl,
    zIndex: 10,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: Spacing.xl3,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  logoContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoLetter: {
    fontSize: 60,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
  },
  title: {
    fontSize: Typography.h2,
    fontWeight: Typography.bold as any,
    color: Colors.text,
    marginBottom: Spacing.sm,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl3,
    textAlign: 'center',
  },
  loaderContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl2,
    height: 8,
  },
  loaderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    opacity: 0.6,
  },
  loadingText: {
    fontSize: Typography.bodySmall,
    color: Colors.textTertiary,
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: Spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: Typography.caption,
    color: Colors.textTertiary,
    letterSpacing: 0.5,
  },
});
