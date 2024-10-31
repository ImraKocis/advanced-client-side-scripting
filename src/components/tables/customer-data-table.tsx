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
import { Customer } from "@/api/customer/customer.ts";
import { City } from "@/api/city/city.ts";
import { Pagination } from "@/components/tables/pagination.tsx";

export interface CustomerDataTableProps {
  customerData: Customer[];
  cityData: City[];
  className?: string;
}

export function CustomerDataTable({
  customerData,
  cityData,
  className,
}: CustomerDataTableProps): ReactElement {
  const [sortState, setSortState] = useState({
    name: false,
    surname: false,
    email: false,
    city: false,
  });
  const [tData, setTData] = useState(customerData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
      name: field === "name",
      surname: field === "surname",
      email: field === "email",
      city: field === "city",
    });
  };

  const handleSort = () => {
    const sortedData = [...customerData].sort((a, b) => {
      if (sortState.name) {
        return a.name.localeCompare(b.name);
      }
      if (sortState.surname) {
        return a.surname.localeCompare(b.surname);
      }
      if (sortState.email) {
        return a.email.localeCompare(b.email);
      }
      if (sortState.city) {
        const cityA = cityData.find((city) => city.id === a.cityId)?.name || "";
        const cityB = cityData.find((city) => city.id === b.cityId)?.name || "";

        // Sort by city, placing "N/A" cities at the bottom
        if (!cityA && cityB) return 1; // `a` has "N/A", place it after `b`
        if (cityA && !cityB) return -1; // `b` has "N/A", place it after `a`

        if (cityA !== cityB) {
          return sortState.city
            ? cityA.localeCompare(cityB)
            : cityB.localeCompare(cityA);
        }
      }
      return 0;
    });
    setTData(sortedData);
  };

  useEffect(() => {
    handleSort();
  }, [sortState, customerData]);

  return (
    <div className={cn("max-w-[800px] mx-auto py-20 px-4", className)}>
      <Table className="max-sm:hidden">
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleSort("name")}>
                  <ArrowUp
                    className={cn(
                      "w-4 h-6 transform duration-300",
                      sortState.name ? "rotate-180" : "",
                    )}
                  />
                </button>
                <p>Name</p>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleSort("surname")}>
                  <ArrowUp
                    className={cn(
                      "w-4 h-6 transform duration-300",
                      sortState.surname ? "rotate-180" : "",
                    )}
                  />
                </button>
                <p>Last Name</p>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleSort("email")}>
                  <ArrowUp
                    className={cn(
                      "w-4 h-6 transform duration-300",
                      sortState.email ? "rotate-180" : "",
                    )}
                  />
                </button>
                <p>Email</p>
              </div>
            </TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">
              <div className="flex items-center justify-end gap-1">
                <button onClick={() => toggleSort("city")}>
                  <ArrowUp
                    className={cn(
                      "w-4 h-6 transform duration-300",
                      sortState.city ? "rotate-180" : "",
                    )}
                  />
                </button>
                <p>City</p>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData.map((customer) => (
            <TableRow key={customer.guid}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.surname}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.telephone}</TableCell>
              <TableCell className="text-right">
                {cityData.find((city) => city.id === customer.cityId)?.name ||
                  "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="sm:hidden">
        {currentPageData.map((customer) => (
          <div
            key={customer.id}
            className="bg-white shadow rounded-lg p-4 mb-4"
          >
            <p>
              <strong>Name:</strong> {customer.name}
            </p>
            <p>
              <strong>Last Name:</strong> {customer.surname}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Phone:</strong> {customer.telephone}
            </p>
            <p>
              <strong>City:</strong>{" "}
              {cityData.find((city) => city.id === customer.cityId)?.name ||
                "N/A"}
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
