export const toFormData = (values = {}, fileFields = {}) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (key in fileFields || value == null) return;

    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
      return;
    }

    if (typeof value === "object" && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, value);
  });

  Object.entries(fileFields).forEach(([key, value]) => {
    if (value == null) return;

    const files = Array.isArray(value) ? value : [value];

    files.forEach((file) => {
      if (file) {
        formData.append(key, file);
      }
    });
  });

  return formData;
};