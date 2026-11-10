/**
 * Converts service form into API-ready payload
 * (future-proof for file uploads)
 */
export const buildServiceFormData = (form) => {
  const data = new FormData();

  if (form.name) data.append("name", form.name);
  if (form.description) data.append("description", form.description);
  if (form.price !== undefined) data.append("price", form.price);
  if (form.durationHours !== undefined) {
    data.append("durationHours", form.durationHours);
  }

  if (form.category) data.append("category", form.category);

  // future geo fields
  if (form.locationLat !== undefined) {
    data.append("locationLat", form.locationLat);
  }
  if (form.locationLn !== undefined) {
    data.append("locationLn", form.locationLn);
  }

  return data;
};