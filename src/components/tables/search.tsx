import { ReactElement } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

export interface TableSearchProps {
  handleSearch: (value: string) => void;
  value: string;
  id: string;
  label: string;
  placeholder?: string;
}

export function TableSearch({
  handleSearch,
  value,
  id,
  label,
  placeholder,
}: TableSearchProps): ReactElement {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        onChange={(event) => handleSearch(event.target.value)}
        value={value}
        placeholder={placeholder ?? "John Doe"}
      />
    </>
  );
}
