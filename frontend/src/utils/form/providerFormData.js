export function buildProviderPayload(data) {
  return {
    title: data.title?.trim(),
    description: data.description?.trim() || "",
    skills: Array.isArray(data.skills) ? data.skills : [],
    experienceYears: Number(data.experienceYears || 0),
    fullAddress: data.fullAddress?.trim() || "",

    // geo (optional)
    locationLat:
      typeof data.locationLat === "number"
        ? data.locationLat
        : undefined,

    locationLn:
      typeof data.locationLn === "number"
        ? data.locationLn
        : undefined,
  };
}