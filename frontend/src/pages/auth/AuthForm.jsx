import { Box, Paper, Typography, Button, Stack } from "@mui/material";

export default function AuthForm({
  title,
  subtitle,
  children,
  onSubmit,
  isLoading,
  footer
}) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Paper
        component="form"
        onSubmit={onSubmit}
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        {/* HEADER */}
        <Stack spacing={0.5} sx={{
          textAlign:"center"
        }}>
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

        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>

        {/* FOOTER */}
        {footer && (
          <Typography
            variant="body2"
            sx={{ 
              mt: 1,
              textAlign:"center"
            }}
          >
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
