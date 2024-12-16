import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoIosArrowDown } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { Loader2 } from "lucide-react";
import { useDeletTransaction } from "@/hooks/useDeleteTransaction";
import { useUser } from "@/hooks/useUser";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setTransactions: Dispatch<SetStateAction<string>>;
  isExpensesLoading: boolean;
  isRevenuesLoading: boolean;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  setTransactions,
  isExpensesLoading,
  isRevenuesLoading,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { userData } = useUser();

  const deleteTransaction = useDeletTransaction(userData?.id);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const selectedRows = table
    .getSelectedRowModel()
    .rows.map(
      (row) => row.original as TData & { transactionType: string; id: string }
    );

  const handleDelete = () => {
    selectedRows.forEach((row) => {
      deleteTransaction.mutate(
        {
          type: row.transactionType + "s",
          transactionId: row.id,
        },
        {
          onSuccess: () => {
            table.resetRowSelection();
          },
        }
      );
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center py-4">
        <Input
          placeholder="Filter categories..."
          value={
            (table.getColumn("category")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("category")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-white"
        />
        <div className="flex items-center gap-4 mt-4 md:mt-0 md:ml-6 h-12">
          <Select
            defaultValue="expenses"
            onValueChange={(value) => setTransactions(value)}
          >
            <SelectTrigger className="w-[180px] bg-customCyan text-customBlack font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expenses">Expenses</SelectItem>
              <SelectItem value="revenues">Revenues</SelectItem>
            </SelectContent>
          </Select>
          <Button
            disabled={selectedRows.length === 0 || deleteTransaction.isPending}
            className={`${
              selectedRows.length >= 1 ? "opacity-100" : "opacity-50"
            } bg-[#FF2F55] h-full px-6 rounded-[5px] hover:bg-[#ff2f55c2] transition-all`}
            onClick={handleDelete}
          >
            {deleteTransaction.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 size={20} className="animate-spin" />
                Loading...
              </span>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden lg:flex">
            <Button
              variant="outline"
              className="ml-auto bg-customBlack text-white hover:bg-customBlackHover transition-colors"
            >
              Columns <IoIosArrowDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer hover:bg-customLightGray transition-colors"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-[5px] border">
        <Table className="bg-white">
          <TableHeader className="bg-[#FAFAFA] h-12">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="pl-12 first:pl-0 md:pl-0"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isRevenuesLoading || isExpensesLoading ? (
            <Loader2 size={60} className="animate-spin text-customCyan m-12" />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`${row}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="pl-12 first:pl-0 md:pl-0"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="flex items-center mt-4">
        <div className="flex-1 text-sm text-customTextColor">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
        <div className="flex items-center gap-2 space-x-2">
          <Button
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-customBlack text-white"
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-customCyan"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
