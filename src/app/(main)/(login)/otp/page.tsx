import AuthPage from "@/src/components/auth/auth";
import Otp from "@/src/components/auth/otp";

export default function OTPPage() {
  return <AuthPage compo={<Otp />} />;
}
