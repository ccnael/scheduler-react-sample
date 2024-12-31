import React, { useState } from 'react';
import { Card } from './Card';
import { OnlineUsers } from './OnlineUsers';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

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
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] rounded-lg border"
      >
        {/* Team Members Column */}
        <ResizablePanel defaultSize={20} minSize={15} className="min-w-[250px]">
          <div className="h-full bg-white p-4">
            <OnlineUsers />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* To Do Column */}
        <ResizablePanel defaultSize={40}>
          <div className="h-full bg-white p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">To Do</h2>
            <div className="grid auto-rows-max gap-3 justify-items-center">
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
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* In Progress Column */}
        <ResizablePanel defaultSize={40}>
          <div className="h-full bg-white p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">In Progress</h2>
            <div className="grid auto-rows-max gap-3 justify-items-center min-h-[100px]">
              {/* Cards will be dropped here */}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};