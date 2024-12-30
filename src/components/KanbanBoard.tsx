import React, { useState } from 'react';
import { Card } from './Card';

export const KanbanBoard = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Task 1', description: 'Complete the project setup' },
    { id: 2, title: 'Task 2', description: 'Design the user interface' },
    { id: 3, title: 'Task 3', description: 'Implement core features' },
  ]);

  const [draggedCard, setDraggedCard] = useState<number | null>(null);

  const handleDragStart = (cardId: number) => {
    setDraggedCard(cardId);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Kanban Board</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* To Do Column */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">To Do</h2>
          <div className="space-y-3">
            {cards.map((card) => (
              <Card
                key={card.id}
                {...card}
                draggable
                onDragStart={() => handleDragStart(card.id)}
                onDragEnd={handleDragEnd}
                isDragging={draggedCard === card.id}
              />
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">In Progress</h2>
          <div className="space-y-3 min-h-[100px]">
            {/* Cards will be dropped here */}
          </div>
        </div>
      </div>
    </div>
  );
};