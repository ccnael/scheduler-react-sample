import React from 'react';

interface CardProps {
  id: number;
  title: string;
  description: string;
  group?: string;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

export const Card = ({
  title,
  description,
  group,
  draggable,
  onDragStart,
  onDragEnd,
  isDragging,
}: CardProps) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`
        bg-white rounded-lg border border-gray-200 p-4 cursor-grab
        transition-all duration-200 w-[200px]
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        hover:shadow-lg hover:border-blue-200
      `}
    >
      <h3 className="font-semibold text-gray-800 mb-2 truncate">{title}</h3>
      <p className="text-gray-600 text-sm line-clamp-2 mb-2">{description}</p>
      {group && (
        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
          {group}
        </span>
      )}
    </div>
  );
};