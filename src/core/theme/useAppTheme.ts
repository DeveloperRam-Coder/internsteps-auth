import { getColors } from './themeManager';

export const useAppTheme = () => {
  const colors = getColors();

  return {
    colors,
  };
};

