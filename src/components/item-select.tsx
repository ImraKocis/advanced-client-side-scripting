import { ReactElement } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export interface ItemSelectProps {
  onSelect: (value: string) => void;
  selected: string;
  placeholder: string;
  disabled?: boolean;
  items?: SelectItem[];
}

interface SelectItem {
  name: string;
  value: string;
}
export function ItemSelect({
  items,
  onSelect,
  selected,
  placeholder,
  disabled,
}: ItemSelectProps): ReactElement {
  return (
    <Select disabled={disabled} onValueChange={onSelect} value={selected}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items?.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
