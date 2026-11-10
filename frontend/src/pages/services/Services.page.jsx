import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RightArrowIcon from "@mui/icons-material/ArrowRight"
import HeroSection from "../../components/HeroSection";
import ServiceCard from "./ServiceCard";
import CategoryTreeSelect from "../categories/CategoryTreeSelect";
import VendorCTASection from "./VendorCTA";

import { useServices } from "../../hooks/api/services/services.hooks";
import { useGeoLocation } from "../../hooks/ui/useGeoLocation";

const initialFilters = {
  search: "",
  category: null,
  sort: "-createdAt",
  locationLat: "",
  locationLn: "",
  radius: 10000,
};

const sortOptions = [
  { label: "Newest", value: "-createdAt" },
  { label: "Oldest", value: "createdAt" },
  { label: "Price: Low to High", value: "price" },
  { label: "Price: High to Low", value: "-price" },
  { label: "Highest Rated", value: "-ratingAverage" },
];

export default function ServicesPage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    ...initialFilters,
    search: searchParams.get("search") ?? "",
    sort: searchParams.get("sort") ?? initialFilters.sort,
    category: searchParams.get("category") ?? null,
    locationLat: searchParams.get("locationLat") ?? "",
    locationLn: searchParams.get("locationLn") ?? "",
    radius: Number(searchParams.get("radius")) || initialFilters.radius,
  }));

  useGeoLocation((key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  });

  const query = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    return {
      search: params.search || undefined,
      category: params.category || undefined,
      minPrice: params.minPrice || undefined,
      maxPrice: params.maxPrice || undefined,
      sort: params.sort || undefined,
      status: params.status || undefined,
      provider: params.provider || undefined,
      locationLat: params.locationLat || undefined,
      locationLn: params.locationLn || undefined,
      radius: params.radius || undefined,
      page: Number(params.page) || 1,
      limit: 12,
    };
  }, [searchParams]);


  const { data, isLoading, isError } = useServices(query);

  const services = data?.services ?? [];
  const meta = data?.meta ?? {};

  const updateFilter = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    const hasLocation =
      filters.locationLat !== "" &&
      filters.locationLn !== "";
    Object.entries(filters).forEach(([key, value]) => {
        if (value == null || value === "") return;
        if (key === "radius" && !hasLocation) return;
        params.set( key, key === "category" && typeof value === "object" ? value._id: String(value)
      );
    });
    setSearchParams(params);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  const handlePageChange = (_, newPage) => {
    setSearchParams((current) => {
      const params = new URLSearchParams(current);
      params.set("page", String(newPage));
      return params;
    });
  };

  const handleViewMap = () => {
    navigate(`/services/search/map?${searchParams.toString()}`);
  };

  if (isLoading) {
    return <Typography sx={{ p: 3 }}>Loading services...</Typography>;
  }

  if (isError) {
    return (
      <Typography color="error" sx={{ p: 3 }}>
        Failed to load services
      </Typography>
    );
  }

  return (
    <>
      <HeroSection
        title="Find the Right Professional for Your Needs"
        subtitle="Explore services, compare professionals, and hire skilled experts for your next project."
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
      >
        <Box component="form" onSubmit={handleSubmit} sx={{
          width:"100%"
        }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={searchBarStyles}
          >
            <TextField
              size="medium"
              placeholder="Search services ..."
              value={filters.search}
              onChange={(event) => updateFilter("search", event.target.value)}
              sx={{
                width: { xs: "100%", md: "60%" },
                minWidth: 280,
                mx: "auto",
                backgroundColor: "background.paper",
                borderRadius: 2,

                "& .MuiOutlinedInput-root": {
                  pr: 0.75,
                  borderRadius: 2,
                  height: 54,
                  "& fieldset": {
                    borderColor: "divider",
                  },
                  "&:hover fieldset": {
                    borderColor: "text.secondary",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                    borderWidth: 1,
                  },
                },

                "& .MuiOutlinedInput-input": {
                  py: 1.5,
                  px: 2,
                  fontSize: 14,
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end" sx={{ m: 0 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "primary.main",
                          color: "white",
                          borderRadius: 1.5,
                          cursor: "pointer",
                          transition: "background-color 0.2s ease",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        }}
                      >
                        <SearchIcon sx={{ fontSize: 20 }} />
                      </Box>
                    </InputAdornment>
                  ),
                },
              }}
            />


            {/* <CategoryTreeSelect
              value={filters.category}
              onChange={(value) => updateFilter("category", value)}
              label="Category"
            /> */}
{/* 
            <Select
              size="small"
              value={filters.sort}
              onChange={(event) =>
                updateFilter("sort", event.target.value)
              }
              sx={{ minWidth: 150 }}
            >
              {sortOptions.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select> */}

            <Button
              type="submit"
              aria-hidden="true"
              sx={{ width:"0px", height:"0px", display:"none" }}
            >
            </Button>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection:"column",
              gap: 1,
              backdropFilter: "blur(26px)",
              WebkitBackdropFilter: "blur(26px)",
              borderRadius: 2,
              px: 1,
              py: 1,
              width:"60%",
              justifySelf:"center",
              mt:4
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent:"space-between",
                gap: 1.5,
                px: 2.5,
                py: 1.25,
                borderRadius: 2,
                color: "#929599",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 0.2,
                }}
              >
                Web Development
              </Typography>

              <RightArrowIcon
                className="category-arrow"
                sx={{
                  width: 20,
                  height: 20,
                  transition: "transform 0.2s ease",
                }}
              />
            </Box>
          </Box>
        </Box>
      </HeroSection>

      

      <Stack spacing={3} sx={pageStyles}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={sectionHeaderStyles}
        >
          <Stack spacing={0.5}>
            <Typography variant="h5" fontWeight={700}>
              Services
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {services.length}{" "}
              {services.length === 1 ? "service" : "services"} found
            </Typography>
          </Stack>

          <IconButton
            onClick={handleViewMap}
            aria-label="View services on map"
            sx={mapButtonStyles}
          >
            <MapOutlinedIcon />
          </IconButton>
        </Stack>

        {services.length > 0 ? (
          <Grid container spacing={3}>
            {services.map((service) => (
              <Grid
                key={service._id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              >
                <ServiceCard service={service} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={emptyStyles}>
            <Typography variant="h6" fontWeight={600}>
              No services found
            </Typography>

            <Typography variant="body2" sx={{ mt: 0.5 }}>
              Try changing your search or filter options.
            </Typography>
          </Box>
        )}

        {meta.pages > 1 && (
          <Box sx={paginationStyles}>
            <Pagination
              count={meta.pages}
              page={query.page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}

      </Stack>
    </>
  );
}

/** @type {import("@mui/material").SxProps} */
const pageStyles = {
  maxWidth: 1440,
  width: "100%",
  mx: "auto",
  px: { xs: 2, sm: 3, md: 4 },
  py: 4,
};

/** @type {import("@mui/material").SxProps} */
const searchBarStyles = {
  borderRadius: 1,
  alignItems: "center",
  gap: 1,
  flexWrap: "wrap",
};

/** @type {import("@mui/material").SxProps} */
const sectionHeaderStyles = {
  justifyContent: "space-between",
  alignItems: "center",
};

/** @type {import("@mui/material").SxProps} */
const mapButtonStyles = {
  border: 1,
  borderColor: "divider",
  borderRadius: 1.5,
};

/** @type {import("@mui/material").SxProps} */
const emptyStyles = {
  py: 8,
  textAlign: "center",
  color: "text.secondary",
};

/** @type {import("@mui/material").SxProps} */
const paginationStyles = {
  display: "flex",
  justifyContent: "center",
  pt: 1,
};
