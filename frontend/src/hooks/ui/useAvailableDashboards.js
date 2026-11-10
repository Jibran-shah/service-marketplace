export function useAvailableDashboards(user) {
  return [
    user?.profile && {
      key: "buyer",
      label: "Buyer Dashboard",
      route: "/buyer/dashboard",
    },

    user?.shop && {
      key: "shop",
      label: "shop Dashboard",
      route: "/shop/dashboard",
    },

    user?.provider && {
      key: "provider",
      label: "Provider Dashboard",
      route: "/provider/dashboard",
    },
  ].filter(Boolean);
}