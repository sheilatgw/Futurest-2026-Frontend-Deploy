"use client";
import UserLayouts from "@/layouts/User/UserLayouts";
import PaidView from "./components/PaidView";

export default function BccDashboardPage() {
  return (
    <UserLayouts withNavbar withFooter withSidebar>
      <main className="relative min-h-screen w-full pt-12 pb-32 md:py-20">
        {/* Background Pattern */}
        <div className="fixed inset-0 z-0 h-full w-full bg-[url(/images/competition/background-bcc.png)] bg-cover"></div>

        <section className="relative z-10 flex w-full items-center justify-center p-4 pt-10">
          <PaidView />
        </section>
      </main>
    </UserLayouts>
  );
}
