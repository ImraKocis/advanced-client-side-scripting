import { ReactElement, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { Pagination } from "@/components/tables/pagination.tsx";
import { useNavigate } from "@tanstack/react-router";
import { Card } from "@/api/card/card.ts";
import { Bill } from "@/api/bill/bill.ts";
import moment from "moment";
import { TableSearch } from "@/components/tables/search.tsx";

export interface BillDataTableProps {
  billData: Bill[];
  creditCardData: Card[];
  className?: string;
}

export function BillDataTable({
  billData,
  creditCardData,
  className,
}: BillDataTableProps): ReactElement {
  const navigate = useNavigate();
  const [sortState, setSortState] = useState({
    id: false,
    date: false,
    total: false,
  });
  const [tData, setTData] = useState(billData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState<string>("");
  const totalPages = Math.ceil(tData.length / pageSize);

  const currentPageData = tData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageSize = (size: number) => {
    setPageSize(size);
  };

  const toggleSort = (field: keyof typeof sortState) => {
    setSortState({
      id: field === "id",
      date: field === "date",
      total: field === "total",
    });
  };

  const handleSort = () => {
    const sortedData = [...billData].sort((a, b) => {
      if (sortState.id) return a.id - b.id;
      if (sortState.date)
        return new Date(a.date).getTime() - new Date(b.date).getTime();

      if (sortState.total) return a.total - b.total;

      return 0;
    });
    setTData(sortedData);
  };

  const handleSearch = () => {
    const filteredData = billData.filter((e) =>
      e.billNumber.toLowerCase().includes(search),
    );
    setTData(filteredData);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleSort();
  }, [sortState, billData]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div className={cn("w-full py-20 xxl:px-0 px-4", className)}>
      <div className="w-[250px] max-lg:w-full mb-4">
        <TableSearch
          label="Search by Bill number"
          id="bill-num"
          handleSearch={(value) => setSearch(value)}
          value={search}
          placeholder="XX25458188"
        />
      </div>
      <Table className="max-sm:hidden">
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleSort("id")}>
                  <ArrowUp
                    className={cn(
                      "w-4 h-6 transform duration-300",
                      sortState.id ? "rotate-180" : "",
                    )}
                  />
                </button>
                <p>ID</p>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleSort("date")}>
                  <ArrowUp
                    className={cn(
                      "w-4 h-6 transform duration-300",
                      sortState.date ? "rotate-180" : "",
                    )}
                  />
                </button>
                <p>Date</p>
              </div>
            </TableHead>
            <TableHead>Bill no.</TableHead>
            <TableHead>Credit card no.</TableHead>
            <TableHead className="text-right">
              <div className="flex items-center justify-end gap-1">
                <button onClick={() => toggleSort("total")}>
                  <ArrowUp
                    className={cn(
                      "w-4 h-6 transform duration-300",
                      sortState.total ? "rotate-180" : "",
                    )}
                  />
                </button>
                <p>Total</p>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData.map((bill) => (
            <TableRow
              className="hover:bg-gray-300 transform duration-300 hover:cursor-pointer"
              key={bill.guid}
              onClick={() =>
                navigate({
                  to: "/items/$billId",
                  params: { billId: bill.id.toString() },
                })
              }
            >
              <TableCell>{bill.id}</TableCell>
              <TableCell>
                {moment(new Date(bill.date)).format("MMM Do YYYY")}
              </TableCell>
              <TableCell>{bill.billNumber}</TableCell>
              <TableCell>
                {creditCardData
                  .find((card) => card.id === bill.creditCardId)
                  ?.type.toUpperCase()}
              </TableCell>
              <TableCell className="text-right">
                {bill.total.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="sm:hidden">
        {currentPageData.map((bill) => (
          <div
            key={bill.guid}
            className="bg-white shadow rounded-lg p-4 mb-4"
            onClick={() =>
              navigate({
                to: "/items/$billId",
                params: { billId: bill.id.toString() },
              })
            }
          >
            <p>
              <strong>ID:</strong> {bill.id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {moment(new Date(bill.date)).format("MMM Do YYYY")}
            </p>
            <p>
              <strong>Bill Number:</strong> {bill.billNumber}
            </p>
            <p>
              <strong>Credit Card:</strong>{" "}
              {creditCardData
                .find((card) => card.id === bill.creditCardId)
                ?.type.toUpperCase()}
            </p>
            <p>
              <strong>Total:</strong> {bill.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <Pagination
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        handlePageSize={handlePageSize}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </div>
  );
}
