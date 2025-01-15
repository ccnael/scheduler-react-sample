import React from 'react';
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CardProps {
  id: number;
  title: string;
  description: string;
  group?: string;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  isEvent?: boolean;
  onAction?: (action: string) => void;
}

export const Card = ({
  title,
  description,
  group,
  draggable,
  onDragStart,
  onDragEnd,
  isDragging,
  isEvent,
  onAction,
}: CardProps) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`
        bg-white rounded-lg border border-gray-200 p-2 cursor-grab
        transition-all duration-200 w-full relative
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        hover:shadow-lg hover:border-blue-200
      `}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-semibold text-gray-800 text-sm truncate flex-1">{title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-slate-100">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!isEvent ? (
              <>
                <DropdownMenuItem onClick={() => onAction?.('print')}>
                  Print
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction?.('hold')}>
                  Hold
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction?.('close')}>
                  Close
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={() => onAction?.('update')}>
                  Update Event
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction?.('complete')}>
                  Complete Event
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction?.('remove')}>
                  Remove
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-gray-600 text-xs line-clamp-2 mb-1">{description}</p>
      {group && (
        <span className="inline-block px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
          {group}
        </span>
      )}
    </div>
  );
};