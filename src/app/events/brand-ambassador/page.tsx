import Layouts from "@/layouts/Layouts";
import Benefit from "./components/ui/Benefit";
import FooterBA from "./components/ui/FooterBa";
import HeroBA from "./components/ui/HeroBA";
import MoreInformation from "./components/ui/MoreInformation";
import Timeline from "./components/ui/Timeline";
import What from "./components/ui/What";

const BrandAmbassadorPage = () => {
  return (
    <Layouts withNavbar>
      <main className="relative bg-[#FFB700]">
        <div
          className="
                    absolute inset-0 bg-repeat opacity-20
                    bg-[url('/images/events/brand-ambassador/bg-pattern.png')]
                    bg-[length:18px_18px]
                "
        />
        <HeroBA />
        <What />
        <Benefit />
        <Timeline />
        <MoreInformation />
        <FooterBA />
      </main>
    </Layouts>
  );
};

export default BrandAmbassadorPage;
