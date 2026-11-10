
import { useState } from "react";
import {
  Box,
  Typography,
  Popover,
  CircularProgress,
  Paper,
  IconButton,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";

import { useCategoryTree } from "../../hooks/api/categories/categories.hooks";

export default function CategoryTreeSelect({
  value,
  onChange,
  disabled = false,
}) {
  const { data: tree, isLoading, isError } = useCategoryTree();

  const [anchorEl, setAnchorEl] = useState(null);

  const selectedId = typeof value === "object" ? value?._id : value;
  const selectedLabel = typeof value === "object" ? value?.name : "";

  const handleOpen = (event) => {
    if (!disabled) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (id) => {
    onChange?.(id);
    handleClose();
  };

  const handleClear = (event) => {
    event.stopPropagation();
    onChange?.("");
  };

  return (
    <>
      <Paper
        elevation={0}
        onClick={handleOpen}
        sx={{
          ...inputStyles,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.55 : 1,
        }}
      >
        <CategoryIcon sx={iconStyles} />

        <Box sx={textStyles}>
          <Typography variant="body2" sx={valueStyles}>
            {selectedLabel || "Select category"}
          </Typography>
        </Box>

        {selectedId && !disabled && (
          <IconButton
            size="small"
            onClick={handleClear}
            sx={clearButtonStyles}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}

        <ArrowDropDownIcon sx={arrowStyles} />
      </Paper>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            elevation: 4,
            sx: popoverPaperStyles,
          },
        }}
      >
        <Box sx={popoverStyles}>
          {isLoading && (
            <Box sx={loadingStyles}>
              <CircularProgress size={18} />
              <Typography variant="body2" color="text.secondary">
                Loading categories...
              </Typography>
            </Box>
          )}

          {isError && (
            <Typography sx={messageStyles} color="error">
              Failed to load categories
            </Typography>
          )}

          {!isLoading && !isError && tree?.length > 0 &&
            tree.map((node) => (
              <TreeNode
                key={node._id}
                node={node}
                value={selectedId}
                onSelect={handleSelect}
              />
            ))}

          {!isLoading && !isError && !tree?.length && (
            <Typography sx={messageStyles}>
              No categories found
            </Typography>
          )}
        </Box>
      </Popover>
    </>
  );
}

function TreeNode({ node, level = 0, value, onSelect }) {
  const isSelected = value === node._id;

  return (
    <Box sx={{ pl: level * 2 }}>
      <Box
        onClick={() => onSelect(node._id)}
        sx={{
          ...nodeStyles,
          bgcolor: isSelected ? "action.selected" : "transparent",
          color: isSelected ? "primary.main" : "text.primary",
          fontWeight: isSelected ? 600 : 400,
        }}
      >
        {node.name}
      </Box>

      {node.children?.map((child) => (
        <TreeNode
          key={child._id}
          node={child}
          level={level + 1}
          value={value}
          onSelect={onSelect}
        />
      ))}
    </Box>
  );
}

/** @type {import("@mui/material").SxProps} */
const inputStyles = {
  display: "flex",
  alignItems: "center",
  height: 42,
  px: 1.25,
  minWidth: 200,
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 1.5,
  backgroundColor: "transparent",
  transition: "border-color 0.15s ease, background-color 0.15s ease",
};

/** @type {import("@mui/material").SxProps} */
const iconStyles = {
  mr: 1,
  fontSize: 20,
  color: "text.secondary",
};

/** @type {import("@mui/material").SxProps} */
const textStyles = {
  flex: 1,
  minWidth: 0,
};

/** @type {import("@mui/material").SxProps} */
const valueStyles = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  lineHeight: 1.4,
};

/** @type {import("@mui/material").SxProps} */
const clearButtonStyles = {
  width: 28,
  height: 28,
  mr: 0.25,
  color: "text.secondary",
  "&:hover": {
    color: "text.primary",
    backgroundColor: "action.hover",
  },
};

/** @type {import("@mui/material").SxProps} */
const arrowStyles = {
  color: "text.secondary",
  fontSize: 22,
};

/** @type {import("@mui/material").SxProps} */
const popoverPaperStyles = {
  mt: 0.75,
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 1.5,
};

/** @type {import("@mui/material").SxProps} */
const popoverStyles = {
  width: 320,
  maxWidth: "calc(100vw - 32px)",
  maxHeight: 360,
  overflow: "auto",
  p: 1,
  backgroundColor: "background.paper",
};

/** @type {import("@mui/material").SxProps} */
const nodeStyles = {
  cursor: "pointer",
  px: 1.25,
  py: 0.75,
  borderRadius: 1,
  fontSize: 14,
  lineHeight: 1.4,
  transition: "background-color 0.12s ease",
  "&:hover": {
    backgroundColor: "action.hover",
  },
};

/** @type {import("@mui/material").SxProps} */
const loadingStyles = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 1.25,
  py: 1.5,
};

/** @type {import("@mui/material").SxProps} */
const messageStyles = {
  px: 1.25,
  py: 1.5,
};
