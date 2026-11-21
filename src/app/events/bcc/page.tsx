import Layouts from "@/layouts/Layouts";
import MainSection from "./components/MainSection";
import SecondSection from "./components/SecondSection";
import ThirdSection from "./components/ThirdSection";

export default function Page() {
  return (
    <Layouts withNavbar>
      <>
        <MainSection />
        <SecondSection />
        <ThirdSection />
      </>
    </Layouts>
  );
}
