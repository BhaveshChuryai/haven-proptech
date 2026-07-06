import LoginForm from "./LoginForm.jsx";
import PageShell from "@/components/PageShell/PageShell";

export const metadata = {
  title: "Client Login — Haven Group | Private Access",
  description: "Sign in to the Haven client portal to track your land requirements and access private opportunities.",
};

export default function LoginPage() {
  return (
    <PageShell>
      <LoginForm />
    </PageShell>
  );
}
