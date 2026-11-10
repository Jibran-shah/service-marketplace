import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563eb",
    },

    secondary: {
      main: "#7c3aed",
    },

    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },

    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },

    success: {
      main: "#16a34a",
    },

    error: {
      main: "#dc2626",
    },

    warning: {
      main: "#f59e0b",
    },
  },

  typography: {
    fontFamily: ["Inter", "Roboto", "Arial", "sans-serif"].join(","),

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 4,
  },

  shadows: [
    "none",
    "0 1px 2px rgba(15, 23, 42, 0.04)",
    "0 2px 6px rgba(15, 23, 42, 0.06)",
    "0 4px 12px rgba(15, 23, 42, 0.08)",
    "0 8px 24px rgba(15, 23, 42, 0.10)",
    "0 12px 32px rgba(15, 23, 42, 0.12)",
    ...Array(19).fill("0 16px 40px rgba(15, 23, 42, 0.12)"),
  ],

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "0 2px 6px rgba(15, 23, 42, 0.06)",
          transition: "all 0.2s ease",
          border: "1px solid rgba(15, 23, 42, 0.06)",

          "&:hover": {
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.10)",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundImage: "none",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: "8px 14px",
        },

        containedPrimary: {
          boxShadow: "none",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;