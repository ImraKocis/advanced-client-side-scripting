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
import { Button } from "@/components/ui/button.tsx";
import { useMutation } from "@tanstack/react-query";
import { deleteItem } from "@/api/item/item.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { queryClient } from "@/main.tsx";

export interface ItemsDataTableProps {
  itemsData: DataTableItem[];
  className?: string;
}

export type DataTableItem = {
  id: number;
  guid: string;
  name: string;
  productNumber: string;
  pricePerPeace: number;
  totalPrice: number;
  quantity: number;
  color: string;
};

export function ItemsDataTable({
  itemsData,
  className,
}: ItemsDataTableProps): ReactElement {
  const [sortState, setSortState] = useState({
    id: false,
    name: false,
    quantity: false,
    price: false,
    totalPrice: false,
  });
  const [tData, setTData] = useState(itemsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { toast } = useToast();
  const totalPages = Math.ceil(tData.length / pageSize);

  const currentPageData = tData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const mutate = useMutation({
    mutationFn: (id: number) => {
      return deleteItem(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({
        title: "Item Deleted",
        description: "The item has been successfully deleted.",
      });
    },
    onError: (error) =>
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      }),
  });

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
      name: field === "name",
      quantity: field === "quantity",
      price: field === "price",
      totalPrice: field === "totalPrice",
    });
  };

  const handleSort = () => {
    const sortedData = [...itemsData].sort((a, b) => {
      if (sortState.id) return a.id - b.id;
      if (sortState.name) return a.name.localeCompare(b.name);
      if (sortState.price) return a.pricePerPeace - b.pricePerPeace;
      if (sortState.quantity) return a.quantity - b.quantity;
      if (sortState.totalPrice) return a.quantity - b.quantity;

      return 0;
    });
    setTData(sortedData);
  };

  useEffect(() => {
    handleSort();
  }, [sortState, itemsData]);

  return (
    <div
      className={cn(
        "max-w-wrapper-desktop w-full mx-auto py-20 xxl:px-0 px-4",
        className,
      )}
    >
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
                <button onClick={() => toggleSort("name")}>
                  <ArrowUp
                    className={cn(
                      "w-4 h-6 transform duration-300",
                      sortState.name ? "rotate-180" : "",
                    )}
                  />
                </button>
                <p>Product name</p>
              </div>
            </TableHead>
            <TableHead>Product number</TableHead>
            <TableHead>Color</TableHead>
            <TableHead className="text-right">
              <div className="flex items-center gap-1">
                <button onClick={() => toggleSort("quantity")}>
                  <ArrowUp
                    className={cn(
                      "w-4 h-6 transform duration-300",
                      sortState.quantity ? "rotate-180" : "",
                    )}
                  />
                </button>
                <p>Quantity</p>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <button onClick={() => toggleSort("price")}>
                  <ArrowUp
                    className={cn(
                      "w-4 h-6 transform duration-300",
                      sortState.price ? "rotate-180" : "",
                    )}
                  />
                </button>
                <p>Price per peace</p>
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div className="flex items-center gap-1">
                <button onClick={() => toggleSort("totalPrice")}>
                  <ArrowUp
                    className={cn(
                      "w-4 h-6 transform duration-300",
                      sortState.totalPrice ? "rotate-180" : "",
                    )}
                  />
                </button>
                <p>Total price</p>
              </div>
            </TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData.map((item) => (
            <TableRow key={item.guid}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.productNumber}</TableCell>
              <TableCell>{item.color}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{`${item.pricePerPeace} €`}</TableCell>
              <TableCell>{`${item.totalPrice.toFixed(2)} €`}</TableCell>
              <TableCell className="flex justify-center">
                <Button
                  onClick={() => mutate.mutate(item.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="sm:hidden">
        {currentPageData.map((item) => (
          <div key={item.guid} className="bg-white shadow rounded-lg p-4 mb-4">
            <p>
              <strong>ID:</strong> {item.id}
            </p>
            <p>
              <strong>Product Name:</strong> {item.name}
            </p>
            <p>
              <strong>Product Number:</strong> {item.productNumber}
            </p>
            <p>
              <strong>Color:</strong> {item.color}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <p>
              <strong>Price per Peace:</strong> {`${item.pricePerPeace} €`}
            </p>
            <p className="mb-4">
              <strong>Total Price:</strong> {`${item.totalPrice.toFixed(2)} €`}
            </p>
            <Button
              onClick={() => mutate.mutate(item.id)}
              variant="destructive"
            >
              Delete
            </Button>
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
