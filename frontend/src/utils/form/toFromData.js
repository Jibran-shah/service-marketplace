export const toFormData = (values = {}, fileFields = {}) => {
  const formData = new FormData();

  const appendValue = (key, value) => {
    if (value === undefined || value === null) return;

    // File / Blob
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
      return;
    }

    // Array handling
    if (Array.isArray(value)) {
      value.forEach((item) => {
        // If array of files
        if (item instanceof File || item instanceof Blob) {
          formData.append(key, item);
        } else if (typeof item === "object") {
          formData.append(key, JSON.stringify(item));
        } else {
          formData.append(key, item);
        }
      });
      return;
    }

    // Object handling (non-file objects)
    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    // Primitive values
    formData.append(key, value);
  };

  // =========================
  // 1. NORMAL FIELDS
  // =========================
  Object.entries(values).forEach(([key, value]) => {
    // skip file fields here (handled separately)
    if (fileFields[key]) return;

    appendValue(key, value);
  });

  // =========================
  // 2. FILE FIELDS
  // =========================
  Object.entries(fileFields).forEach(([key, value]) => {
    appendValue(key, value);
  });

  return formData;
};