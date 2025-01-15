import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options = [],
  selected = [],
  onChange,
  placeholder
}) => {
  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(item => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative">
      <Select
        onValueChange={handleSelect}
      >
        <SelectTrigger className="w-full">
          <div className="flex flex-wrap gap-1">
            {selected.length === 0 ? (
              <SelectValue placeholder={placeholder} />
            ) : (
              <div className="flex flex-wrap gap-1">
                {selected.map(item => (
                  <Badge 
                    key={item}
                    variant="secondary"
                    className="mr-1"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="max-h-[200px]">
            {options.map((option) => (
              <SelectItem
                key={option}
                value={option}
                className="flex items-center justify-between"
              >
                <span>{option}</span>
                {selected.includes(option) && (
                  <Check className="h-4 w-4 ml-2" />
                )}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};