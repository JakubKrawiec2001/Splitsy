import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TransactionType } from "@/types";
import { Loader2 } from "lucide-react";

type PropsType = {
  revenues: TransactionType[];
  isRevenuesLoading: boolean;
};
const RevenuesTable = ({ revenues, isRevenuesLoading }: PropsType) => {
  if (isRevenuesLoading)
    return <Loader2 size={60} className="animate-spin text-customCyan" />;
  return (
    <div className="max-h-[720px] overflow-y-auto custom-scroll">
      <Table>
        <TableBody>
          {revenues.map((revenue) => {
            return (
              <TableRow>
                <TableCell className="flex items-center gap-4 2xl:gap-6">
                  <div
                    className="rounded-full xl:size-[40px] 2xl:size-[45px] hidden xl:block"
                    style={{ backgroundColor: revenue.color }}
                  >
                    <img
                      src={revenue.icon}
                      alt=""
                      className="w-full p-2 xl:p-3 invert-[1]"
                    />
                  </div>
                  <div>
                    <p className="truncate text-customBlack text-base">
                      {revenue.category}
                    </p>
                    <p className="text-customTextColor">
                      {revenue.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right text-customBlack text-base font-semibold xl:pr-8">
                  ${revenue.amount}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RevenuesTable;
