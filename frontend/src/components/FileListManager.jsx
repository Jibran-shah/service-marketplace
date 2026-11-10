import { useEffect, useMemo } from "react";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";



export default function FileListManager({
  value = [],
  onChange,
  label = "Files",
  renderPreview = true,
  removable = true,
}) {
  const files = Array.isArray(value) ? value.filter(Boolean) : [];
  const isImage = (item) => {
    if (item instanceof File) {
      return item.type?.startsWith("image/");
    }
    return (
      item?.type?.startsWith?.("image/") ||
      Boolean(item?.url)
    );
  };

  const previews = useMemo(
    () =>
      files.map((item) => {
        if (
          item instanceof File &&
          item.type?.startsWith("image/")
        ) {
          return URL.createObjectURL(item);
        }

        return item?.url || null;
      }),
    [files]
  );

  useEffect(() => {
    return () => {
      previews.forEach((url, index) => {
        if (files[index] instanceof File && url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previews, files]);

  const handleRemove = (index) => {
    onChange?.(files.filter((_, i) => i !== index));
  };

  return (
    <Box>
      {label && (
        <Typography variant="subtitle2" mb={1} fontWeight={600}>
          {label}
        </Typography>
      )}

      {!files.length ? (
        <Typography sx={emptyStyles}>
          No files selected
        </Typography>
      ) : (
        <Stack spacing={1}>
          {files.map((item, index) => (
            <Paper
              key={item.id}
              variant="outlined"
              sx={itemStyles}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={contentStyles}
              >
                {renderPreview &&
                  isImage(item) &&
                  previews[index] && (
                    <Box
                      component="img"
                      src={previews[index]}
                      alt={item.name}
                      sx={previewStyles}
                    />
                  )}

                <Box sx={nameStyles}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {(item.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                </Box>
              </Stack>

              {removable && (
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemove(index)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}


/** @type {import("@mui/material").SxProps} */
const itemStyles = {
  p: 1.25,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  borderRadius: 2,
};

/** @type {import("@mui/material").SxProps} */
const contentStyles = {
  minWidth: 0,
  alignItems: "center",
};

/** @type {import("@mui/material").SxProps} */
const previewStyles = {
  width: 48,
  height: 48,
  objectFit: "cover",
  borderRadius: 1.5,
  flexShrink: 0,
  border: "1px solid",
  borderColor: "divider",
};

/** @type {import("@mui/material").SxProps} */
const nameStyles = {
  minWidth: 0,
};

/** @type {import("@mui/material").SxProps} */
const emptyStyles = {
  fontSize: 12,
  color: "text.secondary",
};