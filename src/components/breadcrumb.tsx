import Typography from "@/components/typography";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export interface BreadCrumb {
  name: string;
  href: string;
  className?: string;
  font?: "Sora" | "FiraSans" | "Titillium";
  weight?: "bold" | "extrabold" | "regular" | "medium" | "semibold";
}

interface props {
  items: BreadCrumb[];
}
export default function BreadcrumbGroup({ items }: props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((e, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbLink key={index} href={e.href}>
                <Typography
                  className={cn(
                    index + 1 == items.length
                      ? "text-[#4580B2]"
                      : "text-[#7A7A7A]",
                    "max-lg:!text-sm",
                    e.className,
                  )}
                  variant="bt"
                  weight={e.weight || "bold"}
                  font={e.font || "FiraSans"}
                >
                  {e.name}
                </Typography>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index + 1 != items.length && (
              <BreadcrumbSeparator>
                {/* <Slash className="text-black" /> */}
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
