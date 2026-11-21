import Layouts from "@/layouts/Layouts";
import Competition from "./_components/ui/Competition";
import EventSection from "./_components/ui/Event";
import Hero from "./_components/ui/Hero";
import ReRun from "./_components/ui/ReRun";
import Timeline from "./_components/ui/Timeline";
import MiniSponsor from "./_components/ui/MiniSponsor";

export default function Home() {
  return (
    <Layouts withNavbar>
      <Hero />
      <EventSection />
      <Competition />
      <ReRun />
      <Timeline />
      {/* <Sponsor /> */}
      <MiniSponsor />
    </Layouts>
  );
}
