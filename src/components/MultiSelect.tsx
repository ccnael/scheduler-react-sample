import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [open, setOpen] = React.useState(false);

  // Ensure we always have arrays, even if undefined is passed
  const safeOptions = Array.isArray(options) ? options : [];
  const safeSelected = Array.isArray(selected) ? selected : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {safeSelected.length === 0
            ? placeholder
            : `${safeSelected.length} selected`}
          <ChevronRight className={`ml-2 h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {safeOptions.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    safeSelected.includes(option) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};