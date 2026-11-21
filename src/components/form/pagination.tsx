import { cn } from "@/lib/utils";
import { RowData, Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import Typography from "../typography";
import { Button } from "../ui/button";

type PaginationControlProps<T extends RowData> = {
  data: T[];
  table: Table<T>;
} & React.ComponentPropsWithoutRef<"div">;

/**
 *
 * @see https://javascript.plainenglish.io/create-a-pagination-in-a-react-way-df5c6fe1e0c7
 */
export default function PaginationControl<T extends RowData>({
  className,
  table,
  ...rest
}: PaginationControlProps<T>) {
  const currentPage: number = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const ListPage = () => {
    const limit = isMobile ? 3 : 5;

    if (pageCount <= limit + 2) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // dots
    if (currentPage < limit) {
      for (let i = 1; i <= limit; i++) pages.push(i);
      pages.push("...");
      pages.push(pageCount);
    } else if (currentPage > pageCount - limit + 2) {
      pages.push(1);
      pages.push("...");
      for (let i = pageCount - limit + 1; i <= pageCount; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      const start = currentPage - 1;
      const end = currentPage + 1;
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < pageCount - 1) {
        pages.push("...");
      }
      if (end < pageCount) {
        pages.push(pageCount);
      }
    }
    return pages;
  };

  const handlePageControlClick = (page: string | number) => {
    if (page !== "...") {
      table.setPageIndex((page as number) - 1);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-x-2 pt-4 pb-10 w-full justify-center md:justify-end",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          className={cn(
            "h-10 w-10 p-0 bg-transparent hover:bg-transparent shadow-none",
            !table.getCanPreviousPage()
              ? "cursor-not-allowed opacity-30"
              : "hover:bg-neutral-100",
          )}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft size={20} className="text-[#52525B]" />
        </Button>

        {/* Page Numbers */}
        {ListPage().map((pageIndex, index) => {
          if (pageIndex === "...") {
            return (
              <div
                key={`dots-${index}`}
                className="flex items-center justify-center h-10 w-10 border border-neutral-300 rounded-lg bg-white select-none"
              >
                <Typography
                  variant="t"
                  weight="medium"
                  font="Helvetica"
                  className="text-[#52525B]"
                >
                  ...
                </Typography>
              </div>
            );
          }

          const isActive = currentPage === pageIndex;

          return (
            <Button
              key={index}
              className={cn(
                "h-10 w-10 p-0 rounded-lg transition-all duration-200 shadow-sm border",
                isActive
                  ? "bg-[#354FB4] border-[#354FB4] hover:bg-[#2a3e91]"
                  : "bg-white border-neutral-300 hover:bg-neutral-50",
              )}
              onClick={() => handlePageControlClick(pageIndex)}
            >
              <Typography
                variant="t"
                weight="medium"
                font="Helvetica"
                className={cn(isActive ? "text-white" : "text-[#52525B]")}
              >
                {pageIndex}
              </Typography>
            </Button>
          );
        })}

        {/* Next Button */}
        <Button
          className={cn(
            "h-10 w-10 p-0 bg-transparent hover:bg-transparent shadow-none",
            !table.getCanNextPage()
              ? "cursor-not-allowed opacity-30"
              : "hover:bg-neutral-100",
          )}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight size={20} className="text-[#52525B]" />
        </Button>
      </div>
    </div>
  );
}
