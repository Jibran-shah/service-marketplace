import { Box } from "@mui/material";
import AuthForm from "./AuthForm";
import AuthFooterLinks from "./AuthFooterLinks";

export default function AuthLayout({
  title,
  subtitle,
  children,
  onSubmit,
  isLoading,
  mode
}) {
  return (
    <Box>
      <AuthForm
        title={title}
        subtitle={subtitle}
        onSubmit={onSubmit}
        isLoading={isLoading}
      >
        {children}

        {/* FOOTER LAYER (SEPARATED SYSTEM) */}
        <AuthFooterLinks mode={mode} />
      </AuthForm>
    </Box>
  );
}