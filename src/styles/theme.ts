import { createTheme } from "@mui/material/styles";

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

export const COLOR_BY_QUANTILE: {
  [quantile: number]: string;
} = {
  0: "#eeeeee",
  1: "#d15353",
  2: "#c62828",
  3: "#c62828",
  4: "#8a1c1c",
};

export default theme;
