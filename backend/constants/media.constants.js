
export const MEMORY_SIZES = Object.freeze({
  ONE_MB:1024*1024,
  ONE_GB:1024*1024*1024
})


export const MEDIA_USAGE_TYPES = Object.freeze({
  THUMBNAIL: "thumbnail",
  BANNER: "banner",
  GALLERY: "gallery",
  AVATAR: "avatar",
  DOCUMENT: "document",
  OTHER: "other",

  AVATAR: "avatar",
  COVER: "cover",

  SHOP_LOGO: "logo",
  SHOP_IMAGE: "shopImages",

  PRODUCT_IMAGE: "productImage",
  SERVICE_IMAGE: "serviceImage",

  CHAT_IMAGE: "chatImage",
  CHAT_VIDEO: "chatVideo",
  CHAT_DOCUMENT: "chatDocument",

  REVIEW_IMAGE: "reviewImage",
  REVIEW_VIDEO: "reviewVideo",
});

export const MEDIA_USAGE_TYPES_ARRAY = Object.freeze(Object.values(MEDIA_USAGE_TYPES));;


export const DEFAULTS = Object.freeze({
    title: "untitled",
    namespaceParts:"default",
    usageType:MEDIA_USAGE_TYPES.OTHER
})

export const NAMESPACES = Object.freeze({
  AVATAR: "user/profile/avatar",
  COVER: "user/profile/cover",

  SHOP_LOGO: "user/shop/logo",
  SHOP_IMAGES: "user/shop/images",

  PRODUCT_IMAGES: "product/images",
  SERVICE_IMAGES: "service/images",

  CHAT_MEDIA: "chat/media",
  REVIEW_MEDIA: "review/media",
});

export const FILE_MAX_SIZES = Object.freeze({
  AVATAR: 5 * MEMORY_SIZES.ONE_MB,
  COVER: 10 * MEMORY_SIZES.ONE_MB,
  PRODUCT_IMAGE: 10 * MEMORY_SIZES.ONE_MB,
  SERVICE_IMAGE: 10 * MEMORY_SIZES.ONE_MB,
  CHAT_IMAGE: 15 * MEMORY_SIZES.ONE_MB,
  CHAT_VIDEO: 50 * MEMORY_SIZES.ONE_MB,
  CHAT_DOCUMENT: 20 * MEMORY_SIZES.ONE_MB,
  REVIEW_IMAGE: 8 * MEMORY_SIZES.ONE_MB,
  REVIEW_VIDEO: 50 * MEMORY_SIZES.ONE_MB,
})


export const MAX_SIZE_CAP = 200 * MEMORY_SIZES.ONE_MB;

export const MEDIA_PROVIDERS = Object.freeze({
  LOCAL:"local",
  AWS_S3:"aws-s3",
  CLOUDINARY:"cloudinary"
});

export const MEDIA_PROVIDERS_ARRAY =Object.freeze(Object.values(MEDIA_PROVIDERS));