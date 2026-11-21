import NavbarUser from "@/layouts/User/NavbarUser";
import SidebarUser from "@/layouts/User/SidebarUser";
import { LayoutProps } from "@/types/layout";

export default function UserLayouts({
  children,
  withNavbar,
  withSidebar,
}: LayoutProps) {
  return (
    <>
      {withNavbar && <NavbarUser />}
      {withSidebar && <SidebarUser />}
      {children}
    </>
  );
}
