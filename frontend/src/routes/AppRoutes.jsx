import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/Login.page";
import RegisterPage from "../pages/auth/Register.page";
import ForgotPasswordPage from "../pages/auth/ForgotPassword.page";
import VerifyOtpPage from "../pages/auth/VerifyOtp.page";
import ResetPasswordPage from "../pages/auth/ResetPassword.page";
import VerifyEmailPage from "../pages/auth/VerifyEmail.page";
import UnauthorizedPage from "../pages/Unauthorized.page";
import BuyerDashboard from "../pages/dashboard/BuyerDashboard.page";
import ProviderDashboard from "../pages/dashboard/ProviderDashboard.page";
import ProfilePage from "../pages/profile/Profile.page";
import EditProfilePage from "../pages/profile/EditProfile.page";
import ServicesPage from "../pages/services/Services.page";
import ServiceDetailsPage from "../pages/services/ServiceDetails.page";
import CreateProfilePage from "../pages/profile/CreateProfile.page";
import ChatsPage from "../pages/chat/Chats.page"
import CreateProviderPage from "../pages/provider/CreateProvider.page"
import EditProviderPage from "../pages/provider/EditProvider.page"
import ProviderPage from "../pages/provider/Provider.page"
import CreateBookingPage from "../pages/bookings/CreateBooking.page";
import EmailVerificationGate from "../pages/auth/EmailVerificationGate.page";
import EmailNotVerifiedGate from "../pages/auth/EmailNotVerifiedGate.page";
import Layout from "./layout";
import CategoryCreatePage from "../pages/categories/CreateCategory.page";
import EditServicePage from "../pages/services/EditService.page";
import ServicesMapPage from "../pages/services/ServicesMap.page";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/emailVerificationGate" element={<EmailVerificationGate />} />
      <Route path="/emailNotVerifiedGate" element={<EmailNotVerifiedGate />} />
      <Route path="/profile/create" element={<CreateProfilePage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<ServicesPage />} />
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/services/update/:id" element={<EditServicePage/>} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        <Route path="/book/:serviceId/:ProviderId" element={<CreateBookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/provider/create" element={<CreateProviderPage />} />
        <Route path="/provider/edit" element={<EditProviderPage />} />
        <Route path="/provider/:id" element={<ProviderPage/>}/>
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="/category/create" element={<CategoryCreatePage/>} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/booking/create/:service" element={<CreateBookingPage/>}/>
      </Route>
      <Route path="/services/search/map" element={<ServicesMapPage/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}