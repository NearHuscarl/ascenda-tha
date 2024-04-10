import { PropsWithChildren } from "react";
import grey from "@mui/material/colors/grey";
import amber from "@mui/material/colors/amber";
import purple from "@mui/material/colors/purple";
import {
  ThemeProvider as ThemeProvider2,
  createTheme,
} from "@mui/material/styles";

export type TMuiColor = Record<keyof typeof grey, string>;

declare module "@mui/material/styles/createPalette" {
  interface SimplePaletteColorOptions {
    color?: TMuiColor;
  }
  interface PaletteColor {
    color: TMuiColor;
  }
}

const CONTROL_HEIGHT = 40;

export const theme = createTheme({
  palette: {
    primary: purple,
    secondary: amber,
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
        sx: {
          fontWeight: "semibold",
          height: CONTROL_HEIGHT,
          padding: `0 20px`,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px 0 rgba(0,0,0,0.10)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: CONTROL_HEIGHT,
        },
      },
    },

    MuiRating: {
      styleOverrides: {
        iconEmpty: {
          color: "#e0e0e0",
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider2 theme={theme}>{children}</ThemeProvider2>;
};
