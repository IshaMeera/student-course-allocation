"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getFilteredRowModel,ColumnFiltersState } from "@tanstack/react-table";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  searchColumn?: string;
  searchPlaceholder?: string;
}

export function DataTable<TData>({
  columns,
  data,
  searchColumn,
  searchPlaceholder
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
        columnFilters,
  },
  });

  return (
    
    <div className="overflow-hidden rounded-2xl border bg-white">
        <div className="flex items-center py-4">
    <Input
        placeholder={searchPlaceholder ?? "Search..."}
        value={
        (table
            .getColumn(searchColumn ?? "")
            ?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
        table
            .getColumn(searchColumn ?? "")
            ?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
    />
    </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}