import {extendTheme, theme as NativeBaseTheme} from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      600: NativeBaseTheme.colors.violet[600],
      500: NativeBaseTheme.colors.violet[500],
      400: NativeBaseTheme.colors.violet[400],
    },
    secondary: {
      500: NativeBaseTheme.colors.indigo[500],
      600: NativeBaseTheme.colors.indigo[600],
    },
    background: {
      900: NativeBaseTheme.colors.warmGray[900],
      800: NativeBaseTheme.colors.warmGray[800],
      700: NativeBaseTheme.colors.warmGray[700],
      600: NativeBaseTheme.colors.warmGray[600],
      400: NativeBaseTheme.colors.warmGray[400],
    },
    text: NativeBaseTheme.colors.light[300],
    title: NativeBaseTheme.colors.light[50],
    error: NativeBaseTheme.colors.red[500],
  },
});
