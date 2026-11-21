"use client";

import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import * as React from "react";

interface BaseData {
  id: string;
}

interface PaginationMeta {
  take: number;
  page: number;
  total_data: number;
  total_page: number;
  sort: string;
  sort_by: string;
}

interface DataTableProps<TData extends BaseData> {
  columns: any[];
  data: TData[];
  filterKey?: keyof TData;
  take: number;
  setTake: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  meta: PaginationMeta;
  subPage?: boolean;
  href?: string;
}

export function DataTable<TData extends BaseData>({
  columns,
  data,
  filterKey,
  take,
  setTake,
  page,
  setPage,
  meta,
  subPage,
  href,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("all");
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Handling routing page
  const handleClick = (params: string, id: string) => {
    subPage && router.push(`${params}/${id}`);
  };

  // Ambil semua unique value dari kolom yang dipilih buat filter
  const filterOptions = React.useMemo(() => {
    if (!filterKey) return [];
    const values = Array.from(
      new Set(data.map((item: any) => item[filterKey])),
    );
    return values.filter((v) => v !== undefined && v !== null);
  }, [data, filterKey]);

  // Data setelah filter diterapkan
  const filteredData = React.useMemo(() => {
    if (filterValue === "all" || !filterKey) return table.getRowModel().rows;
    return table
      .getRowModel()
      .rows.filter(
        (row) =>
          (row.original as any)[filterKey]?.toString().toLowerCase() ===
          filterValue.toLowerCase(),
      );
  }, [filterValue, filterKey, table.getRowModel().rows]);

  // Calculate start and end entry number
  const startEntry = (meta.page - 1) * meta.take + 1;
  const endEntry = Math.min(meta.page * meta.take, meta.total_data);

  return (
    <div className="w-full p-4 space-y-4">
      {/* Search, Filter, Show Entries */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />

        {/* Dynamic Filter */}
        {filterKey && (
          <Select value={filterValue} onValueChange={setFilterValue}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`Filter ${String(filterKey)}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {filterOptions.map((opt) => (
                <SelectItem key={String(opt)} value={String(opt)}>
                  {String(opt)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Show Entries */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select
            value={String(take)}
            onValueChange={(value) => {
              const newTake = Number(value);
              setTake(newTake);
              setPage(1); // Reset ke page 1 saat change take
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder={take} />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100, 200].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border shadow-sm overflow-hidden">
        <Table className="[&_th]:border [&_td]:border [&_th]:border-border [&_td]:border-border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-center text-sm font-semibold bg-muted/30"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {filteredData.length ? (
              filteredData.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-center hover:cursor-pointer"
                      onClick={() => {
                        handleClick(href! || "", row.original.id);
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Info & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Info Showing Entries */}
        <Typography className="text-sm text-muted-foreground">
          Showing {startEntry} to {endEntry} of {meta.total_data} entries
        </Typography>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page <= 1}
            variant="lemon"
            className="text-black"
          >
            <Typography className="text-black">Prev</Typography>
          </Button>

          {/* Page Info */}
          <span className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.total_page}
          </span>

          <Button
            size="sm"
            onClick={() => setPage(Math.min(meta.total_page, page + 1))}
            disabled={page >= meta.total_page}
            variant="lemon"
            className="text-black"
          >
            <Typography className="text-black">Next</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}
