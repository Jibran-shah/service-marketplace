// imageStack.utils.js

/**
 * Move first image to the end (used after swipe)
 */
export const rotateImages = (images) => {
  if (!images || images.length <= 1) return images;

  const [first, ...rest] = images;
  return [...rest, first];
};

/**
 * Get stack position styles for each image
 * top image = index 0
 */
export const getStackStyle = (index, stackConfig) => {
  const { offset, scaleStep, rotateStep } = stackConfig;

  return {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    transform: `
      translate(
        ${index * offset}px,
        ${index * offset}px
      )
      scale(${1 - index * scaleStep})
      rotate(${index * rotateStep}deg)
    `,

    zIndex: 100 - index,

    transition: "all 0.4s ease",
    cursor: index === 0 ? "grab" : "default",
    borderRadius: "16px",
    overflow: "hidden",
  };
};

/**
 * Detect swipe threshold
 */
export const isSwipeValid = (offsetX) => {
  return Math.abs(offsetX) > 80;
};