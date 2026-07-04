import PageShell from "@/components/PageShell/PageShell";
import RouteIntro from "@/components/RouteIntro/RouteIntro";

export default function CommunityPage() {
  return (
    <PageShell>
      <RouteIntro
        eyebrow="Community"
        title="The Haven"
        highlight="Owner Network"
        description="A curated community of verified land owners and serious buyers built around requirement-led discovery."
      />
    </PageShell>
  );
}
