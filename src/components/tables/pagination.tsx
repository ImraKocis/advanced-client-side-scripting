import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { ReactElement } from "react";

export interface PaginationProps {
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  handlePageSelection: (page: number) => void;
  handlePageSize: (size: number) => void;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

interface PaginationButtonProps {
  totalPages: number;
  pageSize: number;
  currentPage: number;
  handlePageSelection: (page: number) => void;
}

const generatePageNumbers = (currentPage: number, totalPages: number) => {
  const visibleRange = 5;
  const halfRange = Math.floor(visibleRange / 2); // Pages before and after the current page
  const pageNumbers: (number | string)[] = [];

  if (totalPages <= visibleRange) {
    // If total pages fit within the visible range, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);

    // Add ellipsis if the range starts beyond 2
    if (currentPage > halfRange + 1) {
      pageNumbers.push("...");
    }

    // Add middle pages
    const start = Math.max(2, currentPage - halfRange);
    const end = Math.min(totalPages - 1, currentPage + halfRange);
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if the range ends before the last page
    if (currentPage < totalPages - halfRange) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};

function PaginationButtons({
  totalPages,
  handlePageSelection,
  currentPage,
}: PaginationButtonProps): ReactElement {
  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  return (
    <div className="flex gap-4">
      {pageNumbers.map((page, index) =>
        typeof page === "string" ? (
          <span key={index} className="text-gray-500">
            {page}
          </span>
        ) : (
          <Button
            key={index}
            onClick={() => handlePageSelection(page)}
            disabled={currentPage === page}
          >
            {page}
          </Button>
        ),
      )}
    </div>
  );
}

export function Pagination(props: PaginationProps): ReactElement {
  return (
    <div className="flex justify-between items-center gap-2 mt-10">
      <Button
        onClick={props.goToPreviousPage}
        disabled={props.currentPage === 1}
      >
        <ArrowLeft className="w-4 h-4 sm:hidden" />
        <p className="max-sm:hidden">Previous</p>
      </Button>

      <PaginationButtons {...props} />

      <Select onValueChange={(value) => props.handlePageSize(Number(value))}>
        <SelectTrigger className="w-[90px]">
          <SelectValue placeholder={props.pageSize} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
      <Button
        onClick={props.goToNextPage}
        disabled={props.currentPage === props.totalPages}
      >
        <ArrowRight className="w-4 h-4 sm:hidden" />
        <p className="max-sm:hidden">Next</p>
      </Button>
    </div>
  );
}
