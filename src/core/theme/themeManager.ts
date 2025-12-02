/**
 * Theme Manager - Theme Configuration
 * Handles all theme-related constants and color management
 */

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  success: string;
  successLight: string;
  warning: string;
  error: string;
  errorLight: string;
  background: string;
  surface: string;
  surfaceLight: string;
  surfaceLighter: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  divider: string;
  admin: string;
  instructor: string;
  user: string;
  shadow: string;
  shadowDark: string;
}

export interface Theme {
  colors: ThemeColors;
  typography: typeof Typography;
  spacing: typeof Spacing;
  borderRadius: typeof BorderRadius;
  shadows: typeof Shadows;
  gradients: typeof Gradients;
}

export const getColors = (): ThemeColors => ({
  // Primary colors
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
});

export const Typography = {
  // Font sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 14,
  bodySmall: 12,
  caption: 10,
  
  // Font weights
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xl2: 32,
  xl3: 40,
  xl4: 48,
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Shadows = {
  none: { elevation: 0 },
  sm: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  md: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  lg: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  xl: {
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
};

export const Gradients = {
  primary: ['#0A66FF', '#00D4FF'],
  premium: ['#0A66FF', '#7C3AED'],
  success: ['#00D96F', '#4DFFB3'],
  warning: ['#FFB84D', '#FF9500'],
  error: ['#FF4D6D', '#FF8FA3'],
  background: ['#F5F7FA', '#FFFFFF'],
};

export const getTheme = (): Omit<Theme, 'colors'> => ({
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  gradients: Gradients,
});
