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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      <div className="flex min-h-[200px] rounded-lg border relative">
        <Collapsible
          open={!isCollapsed}
          onOpenChange={(open) => setIsCollapsed(!open)}
          className="relative"
        >
          <div className="flex">
            <CollapsibleContent className="w-[250px] min-w-[250px] h-full bg-white p-4 border-r">
              <OnlineUsers />
            </CollapsibleContent>

            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute z-10 -right-3 top-1/2 -translate-y-1/2"
              >
                <ChevronRight className={`h-4 w-4 transition-transform ${!isCollapsed ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>

        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={50}>
            <div className="h-full bg-white p-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">To Do</h2>
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
              <h2 className="text-xl font-semibold text-gray-700 mb-4">In Progress</h2>
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
        <DialogContent className="sm:max-w-[1024px]">
          <DialogHeader>
            <DialogTitle>Move Card to In Progress</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>View Card Details</AccordionTrigger>
                <AccordionContent>
                  <DataTable data={selectedCard ? [selectedCard] : []} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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