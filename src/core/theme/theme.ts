/**
 * Design System - Futuristic & Modern Theme
 * Premium color palette, typography, and spacing constants
 */

export const Colors = {
  // Primary gradient colors - Modern and professional
  primary: '#0A66FF',
  primaryLight: '#4B9EFF',
  primaryDark: '#0050CC',
  
  // Secondary/Accent colors
  accent: '#00D4FF',
  accentLight: '#4DFFFF',
  accentDark: '#00A8CC',
  
  // Semantic colors
  success: '#00D96F',
  successLight: '#4DFFB3',
  warning: '#FFB84D',
  error: '#FF4D6D',
  errorLight: '#FF8FA3',
  
  // Neutral colors - Light theme
  background: '#F5F7FA',
  surface: '#FFFFFF',
  surfaceLight: '#F8F9FB',
  surfaceLighter: '#E8ECEF',
  
  // Text colors
  text: '#1A202C',
  textSecondary: '#4A5568',
  textTertiary: '#718096',
  
  // Borders and dividers
  border: '#CBD5E0',
  divider: '#E2E8F0',
  
  // Role-based colors
  admin: '#FF6B9D',
  instructor: '#4ECDC4',
  user: '#95E1D3',
  
  // Shadows
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.15)',
};

export const Typography = {
  // Font sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 16,
  bodySmall: 14,
  bodyXSmall: 12,
  caption: 12,
  
  // Font weights
  thin: '100' as const,
  extralight: '200' as const,
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xl2: 24,
  xl3: 32,
  xl4: 40,
  xl5: 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
};

export const Gradients = {
  primary: ['#0A66FF', '#4B9EFF'],
  accent: ['#00D4FF', '#4DFFFF'],
  success: ['#00D96F', '#4DFFB3'],
  error: ['#FF4D6D', '#FF8FA3'],
  background: ['#F5F7FA', '#FFFFFF'],
  glow: ['#0A66FF40', 'transparent'],
};
