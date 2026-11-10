import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ImageCarousel({
  images = [],
  imageStyles
}) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <Box sx={{ ...containerSx, ...emptySx, height }}>
        No Images
      </Box>
    );
  }

  const changeImage = (direction) => {
    setIndex((current) =>
      direction === "next"
        ? (current + 1) % images.length
        : (current - 1 + images.length) % images.length
    );
  };

  return (
    <Box sx={containerSx}>
      <Box sx={{ ...imageContainerSx}}>
        <Box
          component="img"
          src={images[index]}
          alt={`Image ${index + 1}`}
          sx={{...imageSx,...imageStyles}}
        />
      </Box>

      {images.length > 1 && (
        <>
          <IconButton
            onClick={(e) => {
              changeImage("prev")
              e.stopPropagation();
            }}
            aria-label="Previous image"
            sx={{ ...navigationSx, left: 5 }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={(e) => { 
              changeImage("next")
              e.stopPropagation();
            }}
            aria-label="Next image"
            sx={{ ...navigationSx, right: 5 }}
          >
            <ChevronRightIcon />
          </IconButton>

          <Box sx={dotsSx} onClick={(e)=>e.stopPropagation()}>
            {images.map((_, imageIndex) => (
              <Box
                key={imageIndex}
                onClick={(e) =>{
                  setIndex(imageIndex)
                  e.stopPropagation();
                }}
                sx={{
                  ...dotSx,
                  bgcolor:
                    imageIndex === index
                      ? "primary.main"
                      : "action.disabled",
                  transform:
                    imageIndex === index ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}


/** @type {import("@mui/material").SxProps} */
const containerSx = {
  position: "relative",
  width: "100%",
};

/** @type {import("@mui/material").SxProps} */
const imageSx = {
  width: "100%",
  objectFit: "cover",
  display: "block",
};

/** @type {import("@mui/material").SxProps} */
const emptySx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "action.hover",
  color: "text.secondary",
  borderRadius: 2,
};

/** @type {import("@mui/material").SxProps} */
const imageContainerSx = {
  overflow: "hidden",
  borderRadius: 2,
};

/** @type {import("@mui/material").SxProps} */
const navigationSx = {
  position: "absolute",
  width:"35px",
  height:"35px",
  top: "50%",
  transform: "translateY(-50%)",
  bgcolor: "rgba(0, 0, 0, 0.35)",
  color: "common.white",
  backdropFilter: "blur(4px)",
  "&:hover": {
    bgcolor: "rgba(0, 0, 0, 0.55)",
  },
};

/** @type {import("@mui/material").SxProps} */
const dotsSx = {
  display: "flex",
  justifyContent: "center",
  alignItems:"center",
  gap: 0.75,
  mt: 1.5,
  height:"14px",
};

/** @type {import("@mui/material").SxProps} */
const dotSx = {
  width: 7,
  height: 7,
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.2s ease",
};