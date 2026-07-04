import PageShell from "@/components/PageShell/PageShell";
import RouteIntro from "@/components/RouteIntro/RouteIntro";

export default function LoginPage() {
  return (
    <PageShell>
      <RouteIntro
        eyebrow="Client Login"
        title="Private Access"
        highlight="Coming Soon"
        description="The Haven client portal is being prepared for requirement tracking and private opportunity discovery."
      />
    </PageShell>
  );
}
