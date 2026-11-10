/* =========================================================
   FILE
========================================================= */
export const filePopulate = {
  path: "file",
  select: "url size"
};

/* =========================================================
   MEDIA
========================================================= */
export const mediaPopulate = {
  path: "images",
  populate: filePopulate,
};

/* =========================================================
   PROFILE AVATAR
========================================================= */
export const avatarPopulate = {
  path: "avatar",
  populate: filePopulate,
};

/* =========================================================
   PROFILE COVER
========================================================= */
export const coverPopulate = {
  path: "cover",
  populate: filePopulate,
};

/* =========================================================
   NAME
========================================================= */
export const namePopulate = {
  path: "name",
};


export const profilePopulate = {
  path: "profile",
  populate: [
    namePopulate,
    avatarPopulate,
    coverPopulate,
  ],
};


export const userPopulate = {
  path: "user",
  populate: profilePopulate,
};


export const shopPopulate = {
  path: "shop",
  populate: userPopulate,
};


export const reviewUserPopulate = userPopulate;


export const directChatDeepPopulate = {
  path:"participants",
  populate:profilePopulate
}