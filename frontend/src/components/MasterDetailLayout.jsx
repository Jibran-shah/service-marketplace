import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/** @type {import("@mui/material").SxProps} */
const layoutStyles = {
  display: "flex",
  height: "100%",
  width: "100%",
  gap:2,
};

/** @type {import("@mui/material").SxProps} */
const mainStyles = {
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
};

/** @type {import("@mui/material").SxProps} */
const mobileHeaderStyles = {
  p: 1,
  borderBottom: "1px solid",
  borderColor: "divider",
};

/** @type {import("@mui/material").SxProps} */
const mobileMainStyles = {
  flex: 1,
  minHeight: 0,
};

export default function MasterDetailLayout({
  sidebar,
  main,
  hasSelection,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    if (isMobile && hasSelection) {
      setShowMain(true);
    }
  }, [isMobile, hasSelection]);

  const openMain = () => setShowMain(true);
  const closeMain = () => setShowMain(false);

  const sidebarContent =
    typeof sidebar === "function"
      ? sidebar(openMain)
      : sidebar;

  if (!isMobile) {
    return (
      <Box sx={layoutStyles}>
        {sidebarContent}
        <Box sx={mainStyles}>
          {main}
        </Box>
      </Box>
    );
  }

  if (!showMain) {
    return <Box sx={layoutStyles}>{sidebarContent}</Box>;
  }

  return (
    <Box sx={{ ...layoutStyles, flexDirection: "column" }}>
      <Box sx={mobileHeaderStyles}>
        <IconButton onClick={closeMain}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box sx={mobileMainStyles}>
        {main}
      </Box>
    </Box>
  );
}