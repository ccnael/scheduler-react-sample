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
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface FilterState {
  titles: string[];
  descriptions: string[];
  groups?: string[];
}

interface Card {
  id: number;
  title: string;
  description: string;
  group?: string;
}

export const Board = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, title: 'Frontend Task', description: 'Complete the project setup', group: 'Development' },
    { id: 2, title: 'UI Design', description: 'Design the user interface', group: 'Design' },
    { id: 3, title: 'Backend Task', description: 'Implement core features', group: 'Development' },
    { id: 4, title: 'Documentation', description: 'Write API documentation', group: 'Documentation' },
    { id: 5, title: 'Testing', description: 'Perform unit testing', group: 'QA' },
    { id: 6, title: 'Database Design', description: 'Design database schema', group: 'Development' },
    { id: 7, title: 'UX Research', description: 'Conduct user research', group: 'Design' },
    { id: 8, title: 'Security Audit', description: 'Perform security checks', group: 'Security' },
  ]);

  const [draggedCard, setDraggedCard] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [inProgressCards, setInProgressCards] = useState<Card[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const [resourcesFilter, setResourcesFilter] = useState<FilterState>({
    titles: [],
    descriptions: [],
    groups: []
  });
  const [availableJobsFilter, setAvailableJobsFilter] = useState<FilterState>({
    titles: [],
    descriptions: [],
    groups: []
  });
  const [eventsFilter, setEventsFilter] = useState<FilterState>({
    titles: [],
    descriptions: [],
    groups: []
  });

  const uniqueTitles = Array.from(new Set(cards?.map(card => card.title) ?? []));
  const uniqueDescriptions = Array.from(new Set(cards?.map(card => card.description) ?? []));
  const uniqueGroups = Array.from(new Set(cards?.map(card => card.group).filter(Boolean) ?? []));

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

  const MultiSelect = ({ 
    options = [], 
    selected = [], 
    onChange, 
    placeholder 
  }: { 
    options: string[], 
    selected: string[], 
    onChange: (value: string[]) => void,
    placeholder: string 
  }) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selected.length === 0
              ? placeholder
              : `${selected.length} selected`}
            <ChevronRight className={`ml-2 h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {(options || []).map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    onChange(
                      selected.includes(option)
                        ? selected.filter((item) => item !== option)
                        : [...selected, option]
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option) ? "opacity-100" : "opacity-0"
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

  const filteredCards = cards.filter(card => 
    (availableJobsFilter.titles.length === 0 || availableJobsFilter.titles.includes(card.title)) &&
    (availableJobsFilter.descriptions.length === 0 || availableJobsFilter.descriptions.includes(card.description)) &&
    (availableJobsFilter.groups?.length === 0 || availableJobsFilter.groups?.includes(card.group ?? ''))
  );

  const filteredEvents = inProgressCards.filter(card =>
    (eventsFilter.titles.length === 0 || eventsFilter.titles.includes(card.title)) &&
    (eventsFilter.descriptions.length === 0 || eventsFilter.descriptions.includes(card.description)) &&
    (eventsFilter.groups?.length === 0 || eventsFilter.groups?.includes(card.group ?? ''))
  );

  const groupedCards = cards.reduce((acc, card) => {
    const group = card.group || 'Ungrouped';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(card);
    return acc;
  }, {} as Record<string, Card[]>);

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
              <div className="space-y-4">
                <div className="space-y-2">
                  <MultiSelect
                    options={uniqueTitles}
                    selected={resourcesFilter.titles}
                    onChange={(value) => setResourcesFilter(prev => ({ ...prev, titles: value }))}
                    placeholder="Filter by title"
                  />
                  <MultiSelect
                    options={uniqueDescriptions}
                    selected={resourcesFilter.descriptions}
                    onChange={(value) => setResourcesFilter(prev => ({ ...prev, descriptions: value }))}
                    placeholder="Filter by description"
                  />
                  <MultiSelect
                    options={uniqueGroups}
                    selected={resourcesFilter.groups ?? []}
                    onChange={(value) => setResourcesFilter(prev => ({ ...prev, groups: value }))}
                    placeholder="Filter by group"
                  />
                </div>
                <OnlineUsers filterText={resourcesFilter.titles.join(' ')} />
              </div>
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
                <div className="space-y-2">
                  <MultiSelect
                    options={uniqueTitles}
                    selected={availableJobsFilter.titles}
                    onChange={(value) => setAvailableJobsFilter(prev => ({ ...prev, titles: value }))}
                    placeholder="Filter by title"
                  />
                  <MultiSelect
                    options={uniqueDescriptions}
                    selected={availableJobsFilter.descriptions}
                    onChange={(value) => setAvailableJobsFilter(prev => ({ ...prev, descriptions: value }))}
                    placeholder="Filter by description"
                  />
                  <MultiSelect
                    options={uniqueGroups}
                    selected={availableJobsFilter.groups ?? []}
                    onChange={(value) => setAvailableJobsFilter(prev => ({ ...prev, groups: value }))}
                    placeholder="Filter by group"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Available Jobs</h2>
                <Accordion type="multiple" className="w-full">
                  {Object.entries(groupedCards).map(([group, groupCards]) => (
                    <AccordionItem value={group} key={group}>
                      <AccordionTrigger className="text-lg font-medium">
                        {group} ({groupCards.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid auto-rows-max gap-3 justify-items-center"
                             style={{
                               gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                               width: '100%'
                             }}>
                          {groupCards
                            .filter(card =>
                              (availableJobsFilter.titles.length === 0 || availableJobsFilter.titles.includes(card.title)) &&
                              (availableJobsFilter.descriptions.length === 0 || availableJobsFilter.descriptions.includes(card.description)) &&
                              (availableJobsFilter.groups?.length === 0 || availableJobsFilter.groups?.includes(card.group ?? ''))
                            )
                            .map((card) => (
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
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
                <div className="space-y-2">
                  <MultiSelect
                    options={uniqueTitles}
                    selected={eventsFilter.titles}
                    onChange={(value) => setEventsFilter(prev => ({ ...prev, titles: value }))}
                    placeholder="Filter by title"
                  />
                  <MultiSelect
                    options={uniqueDescriptions}
                    selected={eventsFilter.descriptions}
                    onChange={(value) => setEventsFilter(prev => ({ ...prev, descriptions: value }))}
                    placeholder="Filter by description"
                  />
                  <MultiSelect
                    options={uniqueGroups}
                    selected={eventsFilter.groups ?? []}
                    onChange={(value) => setEventsFilter(prev => ({ ...prev, groups: value }))}
                    placeholder="Filter by group"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Events</h2>
                <div className="grid auto-rows-max gap-3 justify-items-center"
                     style={{
                       gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                       width: '100%'
                     }}>
                  {filteredEvents.map((card) => (
                    <Card
                      key={card.id}
                      {...card}
                    />
                  ))}
                </div>
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
