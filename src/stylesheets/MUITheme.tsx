import { createTheme } from "@mui/material";

// https://mui.com/material-ui/customization/theme-components/

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "rgb(255, 192, 203)"
        }
      }
    }
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "var(--text-color-2)",
          "&:hover": {
            color: "var(--accent-color)",
            backgroundColor: "var(--bg-color-2)",
          }
        }
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "var(--text-color-2)",
          fontFamily: "inherit",
          "&.Mui-focused": {
            color: "var(--accent-color)",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "var(--text-color)",
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--bg-color-2)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--bg-color-3)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--accent-color)",
          }
        },
      }
    },
  },
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

export default theme;