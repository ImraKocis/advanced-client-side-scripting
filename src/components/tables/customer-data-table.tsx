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
import { TableSearch } from "@/components/tables/search.tsx";
import { useNavigate } from "@tanstack/react-router";
import { useHomePageContext } from "@/components/context/home-page-context.tsx";

export interface CustomerDataTableProps {
  customerData: Customer[];
  totalItems: string | null;
  cityData: City[];
  className?: string;
}

export function CustomerDataTable({
  customerData,
  cityData,
  totalItems,
  className,
}: CustomerDataTableProps): ReactElement {
  const navigate = useNavigate();
  const { page, setPage, perPage, setPerPage } = useHomePageContext();
  const [sortState, setSortState] = useState({
    name: false,
    surname: false,
    email: false,
    city: false,
  });
  const [tData, setTData] = useState(customerData);
  const [searchValue, setSearchValue] = useState<string>("");
  const totalPages = Math.ceil(Number(totalItems) / perPage);

  const goToNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageSelection = (page: number) => {
    setPage(page);
  };

  const handlePageSize = (size: number) => {
    setPerPage(size);
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

  // ES6 code LO1:
  // const handleSearch = () => {
  //   const filteredData = customerData.filter(
  //     (e) =>
  //       e.name.toLowerCase().includes(searchValue.toLowerCase()) ||
  //       e.surname.toLowerCase().includes(searchValue.toLowerCase()),
  //   );
  //
  //   setTData(filteredData);
  // };

  // ES5 code LO1:
  function handleSearch() {
    var filteredData = customerData.filter(function (e) {
      return (
        e.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        e.surname.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setTData(filteredData);
  }

  useEffect(() => {
    handleSort();
  }, [sortState, customerData]);

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  return (
    <div
      className={cn("max-w-wrapper-desktop w-full mx-auto py-20", className)}
    >
      <div className="max-w-[250px] mb-4">
        <TableSearch
          id="name-lastname"
          label="Local search by name or surname"
          handleSearch={(value) => setSearchValue(value)}
          value={searchValue}
        />
      </div>
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
          {tData.map((customer) => (
            <TableRow
              className="hover:bg-gray-300 transform duration-300 hover:cursor-pointer"
              key={customer.guid}
              onClick={() =>
                navigate({
                  to: "/bill/$userId",
                  params: { userId: customer.id.toString() },
                })
              }
            >
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
        {tData.map((customer) => (
          <div
            key={customer.id}
            className="bg-white shadow rounded-lg p-4 mb-4"
            onClick={() =>
              navigate({
                to: "/bill/$userId",
                params: { userId: customer.id.toString() },
              })
            }
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
        handlePageSelection={handlePageSelection}
        currentPage={page}
        totalPages={totalPages}
        pageSize={perPage}
      />
    </div>
  );
}
