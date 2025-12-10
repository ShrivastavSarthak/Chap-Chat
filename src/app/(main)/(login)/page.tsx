import AuthPage from "@/src/components/auth/auth";
import Email from "@/src/components/auth/email";

export default function Home() {
  return <AuthPage compo={<Email/>} />;
}
