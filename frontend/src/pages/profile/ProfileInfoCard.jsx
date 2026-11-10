import { Card, CardContent, Typography, Grid, Stack, Chip } from "@mui/material";

export default function ProfileInfoCard({ profile }) {
  return (
    <Card>
      <CardContent>
        <Typography fontWeight={700} variant="h6">
          About
        </Typography>

        <Typography sx={{ mt: 1, color: "text.secondary" }}>
          {profile?.bio || "No bio available"}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={{xs:6}}>
            <Typography variant="caption">Phone</Typography>
            <Typography>{profile?.phone || "-"}</Typography>
          </Grid>

          <Grid size={{xs:6}}>
            <Typography variant="caption">Location</Typography>
            <Typography>
              {[profile?.city, profile?.country].filter(Boolean).join(", ") || "-"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}