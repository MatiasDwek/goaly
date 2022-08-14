import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#c62828",
    },
    secondary: {
      main: "#ffe082",
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        regular: {
          height: 50,
          minHeight: 32,
        },
      },
    },
  },
});

export default theme;
