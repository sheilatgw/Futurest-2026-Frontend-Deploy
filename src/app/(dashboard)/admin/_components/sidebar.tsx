"use client";

import Typography from "@/components/typography"; // Asumsi Anda punya komponen ini
import {
  Calendar,
  ChevronLeft,
  Code,
  DollarSign,
  LayoutDashboard,
  Megaphone,
  Paintbrush,
  Settings,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";

export default function SidebarAdmin() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItemStyles = {
    button: ({ active }: { active: boolean }) => ({
      color: active ? "#FFFFFF" : "#374151", // text-white atau text-gray-700
      backgroundColor: active ? "#2563EB" : "transparent", // bg-blue-600
      padding: "10px 16px",
      borderRadius: "6px",
      margin: "4px 12px",
      "&:hover": {
        backgroundColor: active ? "#1D4ED8" : "#F3F4F6", // hover:bg-blue-700 atau hover:bg-gray-100
        color: active ? "#FFFFFF" : "#111827",
      },
    }),
    // Sedikit styling untuk sub-menu
    subMenuContent: {
      backgroundColor: "#FFFFFF",
      margin: "0 4px",
    },
  };

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor="#FFFFFF" // Latar belakang sidebar putih
      width="270px"
      collapsedWidth="80px"
      className="border-r border-gray-200 h-screen"
    >
      {/* Header Sidebar dengan Tombol Collapse */}
      <div className="flex items-center justify-between p-4 py-5 border-b border-gray-200">
        <Typography
          variant="h6"
          weight="bold"
          className={collapsed ? "hidden" : ""}
        >
          Dashboard
        </Typography>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100"
        >
          <ChevronLeft
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      <Menu menuItemStyles={menuItemStyles}>
        {/* Item Aktif Sesuai Gambar */}
        <MenuItem active icon={<LayoutDashboard size={20} />} className="mt-2">
          Dashboard Admin
        </MenuItem>

        {/* Sub-menu Sesuai Gambar */}
        <SubMenu
          defaultOpen // Otomatis terbuka
          label="Open Recruitment"
          icon={<UserPlus size={20} />}
        >
          {/* Level 1 adalah untuk sub-item, styling-nya akan sedikit berbeda 
            (sesuai logika 'level' di menuItemStyles)
          */}
          <MenuItem icon={<Calendar size={18} />}>Event</MenuItem>
          <MenuItem icon={<Trophy size={18} />}>Competition</MenuItem>
          <MenuItem icon={<Settings size={18} />}>Operations</MenuItem>
          <MenuItem icon={<Megaphone size={18} />}>Marketing</MenuItem>
          <MenuItem icon={<Users size={18} />}>Public Affairs</MenuItem>
          <MenuItem icon={<Code size={18} />}>IT Dev</MenuItem>
          <MenuItem icon={<DollarSign size={18} />}>Finance</MenuItem>
          <MenuItem icon={<Paintbrush size={18} />}>Decoration</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}

// import { AvatarFallback } from "@radix-ui/react-avatar";
// import { ChevronDown, House, Link, LogOut, Users } from "lucide-react";
// import { useState } from "react";

// import Button from "@/components/buttons/button";
// import NextImage from "@/components/next-image";
// import Typography from "@/components/typography";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { Separator } from "@/components/ui/separator";
// import useAuthStore from "@/stores/use-auth-store";

// import { cn } from "@/lib/utils";
// import NavItemAdmin, { NavItems } from "./nav-items";

// export default function SidebarAdmin({
//   setIsNavbarOpen,
// }: {
//   setIsNavbarOpen: (value: boolean) => void;
// }) {
//   // const [comp, setComp] = useState(true);
//   // const [merch, setMerch] = useState(true);
//   // const [nonComp, setNonComp] = useState(true);
//   const [organize, setOrganize] = useState(true);

//   const user = useAuthStore().user;

//   const NAVITEMS: NavItems[] = [
//     {
//       href: "/admin",
//       name: "Dashboard",
//       icon: <House />,
//     },
//     {
//       href: "/admin/oprec-staff",
//       name: "Oprec Staff",
//       icon: <Users />,
//     },
//     // {
//     //   href: "/admin/oprec-lovol",
//     //   name: "Lovol",
//     //   icon: <Users />,
//     // },
//   ];

//   const NAVORGAIZE: NavItems[] = [
//     {
//       href: "/admin/shortlink",
//       name: "Short Link",
//       icon: <Link />,
//     },
//     // {
//     //   href: "/admin/create-announcement",
//     //   name: "Announcement",
//     //   icon: <Bell />,
//     // },
//   ];

//   // const NAVMERCH: NavItems[] = [
//   //   {
//   //     href: "/admin/merch-items",
//   //     name: "Merch Items",
//   //     icon: <Package />,
//   //   },
//   //   {
//   //     href: "/admin/orders",
//   //     name: "Orders",
//   //     icon: <Package />,
//   //   },
//   // ];

//   // const NONCOMP: NavItems[] = [
//   //   {
//   //     href: "/admin/pbm",
//   //     name: "PBM",
//   //     icon: <FileChartLine />,
//   //   },
//   //   {
//   //     href: "/admin/petrovis",
//   //     name: "Petrovis",
//   //     icon: <FileChartLine />,
//   //   },
//   //   {
//   //     href: "/admin/city-tour",
//   //     name: "City Tour",
//   //     icon: <Building2 />,
//   //   },
//   // ];

//   // const COMP: NavItems[] = [
//   //   {
//   //     href: "/admin/paper-and-poster",
//   //     name: "Paper and Poster",
//   //     icon: <FileImage />,
//   //   },
//   //   {
//   //     href: "/admin/case-study",
//   //     name: "Case Study",
//   //     icon: <FileQuestion />,
//   //   },
//   //   {
//   //     href: "/admin/fracturing-fluid-design",
//   //     name: "Fracturing Fluid Design",
//   //     icon: <Fuel />,
//   //   },
//   //   {
//   //     href: "/admin/oil-rig-design",
//   //     name: "Oil Rig Design",
//   //     icon: <HardHat />,
//   //   },
//   //   {
//   //     href: "/admin/petrosmart",
//   //     name: "Petrosmart",
//   //     icon: <Microscope />,
//   //   },
//   //   {
//   //     href: "/admin/business-case",
//   //     name: "Business Case",
//   //     icon: <FileText />,
//   //   },
//   //   {
//   //     href: "/admin/plan-of-development",
//   //     name: "Plan of Development",
//   //     icon: <ChartLine />,
//   //   },
//   // ];

//   const logout = useAuthStore().logout;
//   const handleLogout = () => {
//     logout();
//     localStorage.removeItem("user");
//   };

//   return (
//     <div className="flex flex-col">
//       <NextImage
//         src={"/logo-new.png"}
//         width={84}
//         height={162}
//         alt="Logo"
//         className="self-center"
//       />
//       <div className="mt-10 flex items-center gap-2 rounded-2xl border-[0.5px] border-[#DDD] bg-white p-3">
//         <Avatar className="h-auto w-[15%]">
//           <AvatarImage
//             src="https://github.com/petrolida2026.png"
//             alt="@admin"
//           />
//           <AvatarFallback>AD</AvatarFallback>
//         </Avatar>
//         <div className="flex w-[80%] flex-col">
//           <Typography variant="p" weight="semibold" className="break-words">
//             {user?.name}
//           </Typography>
//           <Typography
//             variant="p"
//             className="break-words text-sm text-[#9D9D9D]"
//           >
//             {user?.email}
//           </Typography>
//         </div>
//       </div>
//       <div className="mt-8 flex flex-col gap-4">
//         {NAVITEMS.map((e, index) => (
//           <NavItemAdmin
//             key={index}
//             href={e.href}
//             name={e.name}
//             icon={e.icon}
//             onClick={() => setIsNavbarOpen(false)}
//           />
//         ))}
//         <Separator />

//         <Collapsible
//           className="space-y-4"
//           open={organize}
//           onOpenChange={setOrganize}
//         >
//           <CollapsibleTrigger className="flex w-full items-center justify-between">
//             <Typography variant="p" weight="bold">
//               Organize
//             </Typography>
//             <ChevronDown
//               className={cn(
//                 "transition-all duration-200",
//                 !organize && "rotate-180",
//               )}
//             />
//           </CollapsibleTrigger>
//           <CollapsibleContent>
//             {NAVORGAIZE.map((e, index) => (
//               <NavItemAdmin
//                 key={index}
//                 href={e.href}
//                 name={e.name}
//                 icon={e.icon}
//                 onClick={() => setIsNavbarOpen(false)}
//               />
//             ))}
//           </CollapsibleContent>
//         </Collapsible>

//         {/* <Separator /> */}

//         {/* <Collapsible className="space-y-4" open={merch} onOpenChange={setMerch}>
//           <CollapsibleTrigger className="flex w-full items-center justify-between">
//             <Typography variant="p" weight="bold">
//               Merchandise
//             </Typography>
//             <ChevronDown
//               className={cn(
//                 "transition-all duration-200",
//                 !merch && "rotate-180",
//               )}
//             />
//           </CollapsibleTrigger>
//           <CollapsibleContent>
//             {NAVMERCH.map((e, index) => (
//               <NavItemAdmin
//                 key={index}
//                 href={e.href}
//                 name={e.name}
//                 icon={e.icon}
//                 onClick={() => setIsNavbarOpen(false)}
//               />
//             ))}
//           </CollapsibleContent>
//         </Collapsible>

//         <Separator /> */}

//         {/* <Collapsible
//           className="space-y-4"
//           open={nonComp}
//           onOpenChange={setNonComp}
//         >
//           <CollapsibleTrigger className="flex w-full items-center justify-between">
//             <Typography variant="p" weight="bold">
//               Non-Competition
//             </Typography>
//             <ChevronDown
//               className={cn(
//                 "transition-all duration-200",
//                 !nonComp && "rotate-180",
//               )}
//             />
//           </CollapsibleTrigger>
//           <CollapsibleContent>
//             {NONCOMP.map((e, index) => (
//               <NavItemAdmin
//                 key={index}
//                 href={e.href}
//                 name={e.name}
//                 icon={e.icon}
//                 onClick={() => setIsNavbarOpen(false)}
//               />
//             ))}
//           </CollapsibleContent>
//         </Collapsible>

//         <Separator /> */}

//         {/* <Collapsible className="space-y-4" open={comp} onOpenChange={setComp}>
//           <CollapsibleTrigger className="flex w-full items-center justify-between">
//             <Typography variant="p" weight="bold">
//               Competition
//             </Typography>
//             <ChevronDown
//               className={cn(
//                 "transition-all duration-200",
//                 !comp && "rotate-180",
//               )}
//             />
//           </CollapsibleTrigger>
//           <CollapsibleContent>
//             {COMP.map((e, index) => (
//               <NavItemAdmin
//                 key={index}
//                 href={e.href}
//                 name={e.name}
//                 icon={e.icon}
//                 onClick={() => setIsNavbarOpen(false)}
//               />
//             ))}
//           </CollapsibleContent>
//         </Collapsible> */}

//         <Button
//           variant="danger"
//           size="md"
//           leftIcon={LogOut}
//           leftIconClassName="mr-2"
//           onClick={handleLogout}
//         >
//           Logout
//         </Button>
//       </div>
//     </div>
//   );
// }
