import PageShell from "@/components/PageShell/PageShell";
import RouteIntro from "@/components/RouteIntro/RouteIntro";
import Projects from "@/components/Projects/Projects";

export default function VaultPage() {
  return (
    <PageShell>
      <RouteIntro
        eyebrow="The Vault"
        title="Verified Land"
        highlight="Opportunities"
        description="A premium view into selected opportunities across Lonavala, Karjat, Igatpuri, and Goa."
      />
      <div className="gold-divider" />
      <Projects />
    </PageShell>
  );
}
