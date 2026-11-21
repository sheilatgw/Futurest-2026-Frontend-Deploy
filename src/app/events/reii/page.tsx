"use client";

import Layouts from "@/layouts/Layouts";
import Events from "./_components/Events";
import Technical from "./_components/Technical";
import Timeline from "./_components/Timeline";

export default function Page() {
  return (
    <Layouts withNavbar withFooter={true}>
      <Events />
      <Technical />
      <Timeline />
    </Layouts>
  );
}
