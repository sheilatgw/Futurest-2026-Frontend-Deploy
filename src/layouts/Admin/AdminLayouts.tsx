import NavbarUser from "@/layouts/Admin/NavbarUser";
import SidebarAdmin from "@/layouts/Admin/SidebarAdmin";
import { LayoutProps } from "@/types/layout";

export default function AdminLayouts({
  children,
  withNavbar,
  withSidebar,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F3F3F3] bg-[url(/images/dashboard/bg-admin.svg)] bg-cover bg-center bg-fixed">
      {withNavbar && <NavbarUser />}
      {withSidebar && <SidebarAdmin />}

      {/* 
        Main content area with 'Card on Canvas' layout.
        - Sidebar collapsed width is ~84px.
        - Navbar height is ~80px.
        - Card is white, rounded, and centered with margins.
        - Added generous padding (px-8, pb-8, pt-[120px]) to create the floating effect.
      */}
      <main
        className={`
          transition-all duration-300 ease-in-out
          ${withSidebar ? "lg:ml-[84px] ml-0" : "ml-0"} 
          pt-[100px] md:pt-[120px] 
          px-3 md:px-8 pb-8
          min-h-screen
          flex flex-col
        `}
      >
        <div className="w-full flex-1 bg-white rounded-[24px] md:rounded-[40px] p-4 md:p-8 shadow-sm border border-neutral-100/50">
          {children}
        </div>
      </main>
    </div>
  );
}
