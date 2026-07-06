import PageShell from "@/components/PageShell/PageShell";
import RouteIntro from "@/components/RouteIntro/RouteIntro";
import CommunityFeed from "./CommunityFeed.jsx";

export const metadata = {
  title: "Community — Haven Group | Land Owner Network",
  description: "Browse active land requirements from serious buyers across Maharashtra and Goa. Connect with verified land owners on the Haven network.",
};

export default function CommunityPage() {
  return (
    <PageShell>
      <RouteIntro
        eyebrow="Community"
        title="The Haven"
        highlight="Owner Network"
        description="A curated community of verified land owners and serious buyers built around requirement-led discovery. Browse active requirements or post your own."
      />
      <CommunityFeed />
    </PageShell>
  );
}
