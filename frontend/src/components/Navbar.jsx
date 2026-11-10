import {
  AppBar,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useProfile } from "../hooks/api/profile/profile.hooks";
import { useAvailableDashboards } from "../hooks/ui/useAvailableDashboards";

export default function Navbar() {
  const navigate = useNavigate();
  const [dashboardAnchor, setDashboardAnchor] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { data: profile } = useProfile({ enabled: isAuthenticated });
  console.log("navbar",profile)
  const dashboards = useAvailableDashboards(user);
  const closeDashboards = () => setDashboardAnchor(null);

  return (
    <AppBar position="sticky" elevation={0} sx={appBarSx}>
      <Toolbar sx={toolbarSx}>
        <Typography
          onClick={() => navigate("/")}
          sx={logoSx}
        >
          Service
          <Box component="span" sx={logoAccentSx}>
            Marketplace
          </Box>
        </Typography>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Button onClick={() => navigate("/services")} sx={navButtonSx}>
            Services
          </Button>

          <Button onClick={() => navigate("/chats")} sx={navButtonSx}>
            Chats
          </Button>

          {isAuthenticated && dashboards.length > 0 && (
            <>
              <Button
                onClick={(event) => setDashboardAnchor(event.currentTarget)}
                endIcon={<ArrowDropDownIcon />}
                sx={navButtonSx}
              >
                Dashboards
              </Button>

              <Menu
                anchorEl={dashboardAnchor}
                open={Boolean(dashboardAnchor)}
                onClose={closeDashboards}
              >
                {dashboards.map(({ key, label, route }) => (
                  <MenuItem
                    key={key}
                    onClick={() => {
                      closeDashboards();
                      navigate(route);
                    }}
                  >
                    {label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Box>
        {isAuthenticated ? (
          <Avatar
            src={profile?.avatar?.file?.url}
            onClick={() => navigate(`/profile`)} 
            sx={{ 
              ml: "auto",
              width: 34,
              height: 34 
             }}
          />
        ) : (
          <Box>
            <Button size="small" onClick={() => navigate("/login")}>
              Login
            </Button>

            <Button
              size="small"
              variant="contained"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

/** @type {import("@mui/material").SxProps} */
const appBarSx = {
  bgcolor: "background.paper",
  borderBottom: 1,
  borderColor: "divider",
};

/** @type {import("@mui/material").SxProps} */
const toolbarSx = {
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  "& > :last-child": {
    justifySelf: "end",
  },
};

/** @type {import("@mui/material").SxProps} */
const logoSx = {
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  cursor: "pointer",
  fontSize: "1.35rem",
  fontWeight: 800,
  letterSpacing: "-0.8px",
  color: "text.primary",
  userSelect: "none",
};

/** @type {import("@mui/material").SxProps} */
const logoAccentSx = {
  ml: 0.6,
  color: "primary.main",
};

/** @type {import("@mui/material").SxProps} */
const navButtonSx = {
  minWidth: 0,
  px: 1,
  color: "text.primary",
  fontWeight: 500,
  textTransform: "none",
};