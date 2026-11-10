import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

export default function FileInputField({
  label = "Upload File",
  value = [],
  onChange,
  multiple = false,
  maxFiles = 10,
  maxSizeMB = 5,
  accept = "*/*",
}) {
  const [error, setError] = useState("");

  const files = Array.isArray(value) ? value.filter(Boolean) : [];

  const inputId = `file-input-${label
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  const handleChange = ({ target }) => {
    const result = validateFiles({
      fileList: target.files,
      existingFiles: files,
      maxFiles,
      maxSizeMB,
      multiple,
    });

    setError(result.error || "");

    if (!result.files) return;

    onChange?.(
      multiple ? [...files, ...result.files] : result.files
    );

    target.value = "";
  };

  const handleRemove = (index) => {
    onChange?.(files.filter((_, i) => i !== index));
    setError("");
  };

  return (
    <Box>
      <Typography
        variant="subtitle2"
        fontWeight={600}
        mb={1}
      >
        {label}
      </Typography>

      <Stack spacing={1.25}>
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          hidden
        />

        <label htmlFor={inputId}>
          <Button
            component="span"
            variant="contained"
            startIcon={<UploadFileOutlinedIcon />}
            sx={uploadButtonStyles}
          >
            {multiple ? "Upload files" : "Upload file"}
          </Button>
        </label>

        {error && (
          <Typography sx={errorStyles}>
            {error}
          </Typography>
        )}

        {files.length > 0 && (
          <Paper
            variant="outlined"
            sx={multiple ? fileListStyles : singleFileStyles}
          >
            {multiple ? (
              files.map((file, index) => (
                <Chip
                  key={`${file.name}-${index}`}
                  label={file.name}
                  size="small"
                  variant="outlined"
                  onDelete={() => handleRemove(index)}
                />
              ))
            ) : (
              <Stack direction="row" alignItems="center" spacing={1}>
                <UploadFileOutlinedIcon
                  fontSize="small"
                  color="action"
                />

                <Typography
                  variant="body2"
                  noWrap
                  sx={{ minWidth: 0 }}
                >
                  {files[0].name}
                </Typography>
              </Stack>
            )}
          </Paper>
        )}
      </Stack>
    </Box>
  );
}



/** @type {import("@mui/material").SxProps} */
const uploadButtonStyles = {
  textTransform: "none",
  borderRadius: 1.5,
  px: 2,
  py: 1,
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
  },
};

/** @type {import("@mui/material").SxProps} */
const fileListStyles = {
  p: 1.25,
  borderRadius: 1.5,
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  bgcolor: "background.paper",
};

/** @type {import("@mui/material").SxProps} */
const singleFileStyles = {
  px: 1.5,
  py: 1.25,
  borderRadius: 1.5,
  bgcolor: "background.paper",
};

/** @type {import("@mui/material").SxProps} */
const errorStyles = {
  color: "error.main",
  fontSize: 13,
};

const validateFiles = ({
  fileList,
  existingFiles,
  maxFiles,
  maxSizeMB,
  multiple,
}) => {
  const selectedFiles = Array.from(fileList || []);

  if (
    multiple &&
    existingFiles.length + selectedFiles.length > maxFiles
  ) {
    return {
      error: `You can only upload up to ${maxFiles} files.`,
    };
  }

  const oversizedFile = selectedFiles.find(
    (file) => file.size > maxSizeMB * 1024 * 1024
  );

  if (oversizedFile) {
    return {
      error: `"${oversizedFile.name}" exceeds the ${maxSizeMB}MB limit.`,
    };
  }

  return {
    files: multiple ? selectedFiles : selectedFiles.slice(0, 1),
  };
};