export const buildProfileFormData = (data) => {
  const formData = new FormData();

  formData.append("name", data.name);

  if (data.phone) formData.append("phone", data.phone);
  if (data.bio) formData.append("bio", data.bio);
  if (data.country) formData.append("country", data.country);
  if (data.city) formData.append("city", data.city);
  if (data.address) formData.append("address", data.address);

  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  if (data.cover) {
    formData.append("cover", data.cover);
  }

  return formData;
};