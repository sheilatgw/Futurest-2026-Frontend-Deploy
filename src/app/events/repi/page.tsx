import Layouts from "@/layouts/Layouts";
import MainSection from "./components/MainSection";
import TimelineSection from "./components/TimelineSection";

export default function Home() {
  return (
    <Layouts withNavbar>
      <MainSection />
      <TimelineSection />
    </Layouts>
  );
}
