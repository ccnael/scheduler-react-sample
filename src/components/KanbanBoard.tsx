import React, { useState } from 'react';
import { Card } from './Card';
import { OnlineUsers } from './OnlineUsers';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from './DataTable';

export const KanbanBoard = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Task 1', description: 'Complete the project setup' },
    { id: 2, title: 'Task 2', description: 'Design the user interface' },
    { id: 3, title: 'Task 3', description: 'Implement core features' },
  ]);

  const [draggedCard, setDraggedCard] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [inProgressCards, setInProgressCards] = useState<any[]>([]);

  const handleDragStart = (cardId: number) => {
    setDraggedCard(cardId);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedCard) {
      const card = cards.find(c => c.id === draggedCard);
      if (card) {
        setSelectedCard(card);
        setIsModalOpen(true);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedCard) {
      setInProgressCards([...inProgressCards, selectedCard]);
      setCards(cards.filter(card => card.id !== selectedCard.id));
      setIsModalOpen(false);
      setSelectedCard(null);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Kanban Board</h1>
      <div className="flex min-h-[200px] rounded-lg border">
        <div className="w-[250px] min-w-[250px] h-full bg-white p-4 border-r">
          <OnlineUsers />
        </div>

        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={50}>
            <div className="h-full bg-white p-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">To Do</h2>
              <div className="grid auto-rows-max gap-3 justify-items-center" 
                   style={{
                     gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                     width: '100%'
                   }}>
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

          <ResizablePanel defaultSize={50}>
            <div 
              className="h-full bg-white p-4"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-700">In Progress</h2>
              <div className="grid auto-rows-max gap-3 justify-items-center"
                   style={{
                     gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                     width: '100%'
                   }}>
                {inProgressCards.map((card) => (
                  <Card
                    key={card.id}
                    {...card}
                  />
                ))}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Move Card to In Progress</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <DataTable data={selectedCard ? [selectedCard] : []} />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};