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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: "var(--text-color-2)",
          "&:hover": {
            color: "var(--accent-color)",
            backgroundColor: "var(--bg-color-2)",
          },
          "&.Mui-selected": {
            color: "var(--bg-color)",
            backgroundColor: "var(--accent-color)",
            "&:hover": {
              color: "var(--bg-color-2)",
              backgroundColor: "var(--accent-color)",
            }
          }
        }
      }
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          color: "var(--text-color-2)",
          display: "flex",
          flexDirection: "row",
        }
      }
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
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "var(--text-color-2)",
          "&:hover": {
            color: "var(--accent-color)",
            backgroundColor: "var(--bg-color-2)",
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "var(--text-color)",
          "&:hover": {
            color: "var(--accent-color)",
          },
          "&.Mui-selected": {
            color: "var(--accent-color)",
          }
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: "var(--text-color)",
        }
      }
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: "var(--text-color)",
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          color: "var(--text-color)",
        }
      }
    }
  },
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

export default theme;