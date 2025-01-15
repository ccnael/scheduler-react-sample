import React, { useState } from 'react';
import { Card } from './Card';
import { Resources } from './Resources';
import { toast } from "sonner";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { MultiSelect } from './MultiSelect';
import { ChevronRight, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { DataTable } from './DataTable';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterState {
  titles: string[];
  descriptions: string[];
}

interface Card {
  id: number;
  title: string;
  description: string;
  date?: string;
}

interface EventFormData {
  text: string;
  memo: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  priority: string;
}

export const Board = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, title: 'Frontend Task', description: 'Complete the project setup', date: '2024-02-20' },
    { id: 2, title: 'UI Design', description: 'Design the user interface', date: '2024-02-21' },
    { id: 3, title: 'Backend Task', description: 'Implement core features', date: '2024-02-22' },
    { id: 4, title: 'Documentation', description: 'Write API documentation', date: '2024-02-23' },
    { id: 5, title: 'Testing', description: 'Perform unit testing', date: '2024-02-24' },
  ]);

  const [events, setEvents] = useState<Card[]>([
    { id: 6, title: 'Team Meeting', description: 'Weekly sync with the development team', date: '2024-02-25' },
    { id: 7, title: 'Client Demo', description: 'Present new features to the client', date: '2024-02-26' },
    { id: 8, title: 'Training Session', description: 'New employee onboarding', date: '2024-02-27' },
  ]);

  const handleCardAction = (cardId: number, action: string, isEvent: boolean = false) => {
    const cardList = isEvent ? events : cards;
    const card = cardList.find(c => c.id === cardId);
    
    if (!card) return;

    switch (action) {
      case 'print':
        toast.success(`Printing ${card.title}`);
        break;
      case 'hold':
        toast.info(`${card.title} put on hold`);
        break;
      case 'close':
        setCards(cards.filter(c => c.id !== cardId));
        toast.success(`${card.title} closed`);
        break;
      case 'complete':
        setEvents(events.filter(c => c.id !== cardId));
        toast.success(`${card.title} completed`);
        break;
      case 'remove':
        setEvents(events.filter(c => c.id !== cardId));
        toast.info(`${card.title} removed from events`);
        break;
    }
  };

  const [draggedCard, setDraggedCard] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [inProgressCards, setInProgressCards] = useState<Card[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const [resourcesFilter, setResourcesFilter] = useState<FilterState>({
    titles: [],
    descriptions: [],
  });
  const [availableJobsFilter, setAvailableJobsFilter] = useState<FilterState>({
    titles: [],
    descriptions: [],
  });

  const uniqueTitles = Array.from(new Set(cards?.map(card => card.title) ?? []));
  const uniqueDescriptions = Array.from(new Set(cards?.map(card => card.description) ?? []));

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

  const [formData, setFormData] = useState<EventFormData>({
    text: '',
    memo: '',
    dateFrom: '',
    dateTo: '',
    status: 'pending',
    priority: 'medium'
  });

  const handleSubmit = () => {
    if (!formData.text || !formData.dateFrom || !formData.dateTo) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedCard) {
      setEvents([...events, { ...selectedCard, ...formData }]);
      setCards(cards.filter(card => card.id !== selectedCard.id));
      setIsModalOpen(false);
      setSelectedCard(null);
      setFormData({
        text: '',
        memo: '',
        dateFrom: '',
        dateTo: '',
        status: 'pending',
        priority: 'medium'
      });
    }
  };

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'jobs' | 'events'>('jobs');

  const handleOpenFilter = (type: 'jobs' | 'events') => {
    setFilterType(type);
    setIsFilterModalOpen(true);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Board</h1>
      <div className="flex min-h-[200px] rounded-lg border relative">
        <Collapsible
          open={!isCollapsed}
          onOpenChange={(open) => setIsCollapsed(!open)}
          className="relative"
        >
          <div className="flex">
            <CollapsibleContent className="w-[250px] min-w-[250px] h-full bg-white p-4 border-r">
              <Resources filterText={resourcesFilter.titles.join(' ')} />
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
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-700">Available Jobs</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenFilter('jobs')}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="grid auto-rows-max gap-3 justify-items-center"
                       style={{
                         gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                         width: '100%'
                       }}>
                    {cards.filter(card => 
                      (availableJobsFilter.titles.length === 0 || availableJobsFilter.titles.includes(card.title)) &&
                      (availableJobsFilter.descriptions.length === 0 || availableJobsFilter.descriptions.includes(card.description))
                    ).map((card) => (
                      <Card
                        key={card.id}
                        {...card}
                        draggable
                        onDragStart={() => handleDragStart(card.id)}
                        onDragEnd={handleDragEnd}
                        isDragging={draggedCard === card.id}
                        onAction={(action) => handleCardAction(card.id, action)}
                      />
                    ))}
                  </div>
                </ScrollArea>
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
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-700">Events</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenFilter('events')}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="grid auto-rows-max gap-3 justify-items-center"
                       style={{
                         gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                         width: '100%'
                       }}>
                    {events.map((card) => (
                      <Card
                        key={card.id}
                        {...card}
                        isEvent
                        onAction={(action) => handleCardAction(card.id, action, true)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Event Form Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[1024px]">
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Accordion type="multiple" defaultValue={["item-1", "item-2"]} className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Primary Information</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => setFormData({ ...formData, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) => setFormData({ ...formData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text">Text *</Label>
                      <Input
                        id="text"
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        placeholder="Enter text"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="memo">Memo</Label>
                      <Textarea
                        id="memo"
                        value={formData.memo}
                        onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                        placeholder="Enter memo"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateFrom">Date From *</Label>
                        <Input
                          id="dateFrom"
                          type="date"
                          value={formData.dateFrom}
                          onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateTo">Date To *</Label>
                        <Input
                          id="dateTo"
                          type="date"
                          value={formData.dateTo}
                          onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Card Details</AccordionTrigger>
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

      {/* Filter Modal */}
      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter {filterType === 'jobs' ? 'Available Jobs' : 'Events'}</DialogTitle>
            <DialogDescription>
              Select your filter criteria below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <MultiSelect
                options={uniqueTitles}
                selected={filterType === 'jobs' ? availableJobsFilter.titles : []}
                onChange={(value) => filterType === 'jobs' && setAvailableJobsFilter(prev => ({ ...prev, titles: value }))}
                placeholder="Filter by title"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <MultiSelect
                options={uniqueDescriptions}
                selected={filterType === 'jobs' ? availableJobsFilter.descriptions : []}
                onChange={(value) => filterType === 'jobs' && setAvailableJobsFilter(prev => ({ ...prev, descriptions: value }))}
                placeholder="Filter by description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFilterModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsFilterModalOpen(false)}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
