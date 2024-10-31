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
  handlePageSize: (size: number) => void;
  currentPage: number;
  totalPages: number;
  pageSize: number;
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
      <p>
        Page {props.currentPage} of {props.totalPages}
      </p>
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
