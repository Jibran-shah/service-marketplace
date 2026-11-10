import { Box, Paper, Typography, Button, Stack } from "@mui/material";

export default function ProviderProfileForm({
  title = "Create Provider Profile",
  subtitle,
  children,
  onSubmit,
  isLoading,
  footer,
  submitText = "Submit",
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={onSubmit}
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 700,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* HEADER */}
        <Stack spacing={0.5}>
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>

          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Stack>

        {/* FORM CONTENT */}
        {children}

        {/* SUBMIT */}
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : submitText}
        </Button>

        {/* FOOTER */}
        {footer && (
          <Typography variant="body2" sx={{ 
            mt: 1,
            textAlign:"center"
           }}>
            {footer.text}{" "}
            <Button
              size="small"
              onClick={footer.onClick}
              href={footer.to}
              sx={{ textTransform: "none" }}
            >
              {footer.linkText}
            </Button>
          </Typography>
        )}
      </Paper>
    </Box>
  );
}