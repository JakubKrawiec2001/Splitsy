import { TransactionContext } from "@/context/TransactionContext";
import { useContext } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/DataTable";
import { TransactionType } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const Transactions = () => {
  const {
    expenses,
    revenues,
    balance,
    isExpensesLoading,
    isRevenuesLoading,
    totalExpenses,
    totalRevenues,
  } = useContext(TransactionContext);

  const columns: ColumnDef<TransactionType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="ml-6"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="ml-6"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0"
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <img
            src={row.original.icon}
            alt={row.original.category}
            className="size-[25px]"
          />
          <span>{row.original.category}</span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div>{row.original.description}</div>,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0"
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
  ];

  return (
    <div className="h-full border-t">
      <DataTable columns={columns} data={expenses} />
    </div>
  );
};

export default Transactions;
