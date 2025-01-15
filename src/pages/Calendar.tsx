import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { Card } from "@/components/Card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from "lucide-react";
import { toast } from "sonner";
import { MultiSelect } from "@/components/MultiSelect";
import { Badge } from "@/components/ui/badge";

interface EventFormData {
  text: string;
  memo: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  priority: string;
}

interface FilterState {
  statuses: string[];
  priorities: string[];
}

const CalendarPage = () => {
  const [resources] = useState([
    { id: "dev1", title: "John Doe", group: "Development" },
    { id: "des1", title: "Jane Smith", group: "Design" },
    { id: "dev2", title: "Bob Johnson", group: "Development" },
    { id: "qa1", title: "Alice Williams", group: "QA" },
    { id: "doc1", title: "Charlie Brown", group: "Documentation" },
    { id: "des2", title: "Diana Prince", group: "Design" },
    { id: "dev3", title: "Edward Stone", group: "Development" },
    { id: "res1", title: "Fiona Apple", group: "Research" },
    { id: "sec1", title: "George Miller", group: "Security" },
    { id: "dev4", title: "Helen Carter", group: "Development" },
  ]);

  const [events] = useState([
    {
      title: "Project Planning",
      start: new Date(),
      resourceId: "dev1",
      group: "Development"
    },
    {
      title: "Design Review",
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      resourceId: "des1",
      group: "Design"
    },
    {
      title: "QA Testing",
      start: new Date(new Date().setDate(new Date().getDate() + 2)),
      resourceId: "qa1",
      group: "QA"
    },
    {
      title: "Documentation",
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      resourceId: "doc1",
      group: "Documentation"
    },
    {
      title: "Security Audit",
      start: new Date(new Date().setDate(new Date().getDate() + 3)),
      resourceId: "sec1",
      group: "Security"
    }
  ]);

  const [cards] = useState([
    { id: 1, title: 'Task 1', description: 'Complete the project setup', group: 'Development' },
    { id: 2, title: 'Task 2', description: 'Design the user interface', group: 'Design' },
    { id: 3, title: 'Task 3', description: 'Implement core features', group: 'Development' },
    { id: 4, title: 'Task 4', description: 'QA Testing', group: 'QA' },
    { id: 5, title: 'Task 5', description: 'Write documentation', group: 'Documentation' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [draggedCard, setDraggedCard] = useState<number | null>(null);

  const [formData, setFormData] = useState<EventFormData>({
    text: '',
    memo: '',
    dateFrom: '',
    dateTo: '',
    status: 'pending',
    priority: 'medium'
  });

  const [filterState, setFilterState] = useState<FilterState>({
    statuses: [],
    priorities: [],
  });

  const statusOptions = ['pending', 'in-progress', 'completed'];
  const priorityOptions = ['low', 'medium', 'high'];

  const getActiveFiltersCount = (filter: FilterState) => {
    return filter.statuses.length + filter.priorities.length;
  };

  const handleDragStart = (cardId: number) => {
    setDraggedCard(cardId);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const handleDrop = (info: any) => {
    if (draggedCard) {
      const card = cards.find(c => c.id === draggedCard);
      if (card) {
        setSelectedCard(card);
        setIsModalOpen(true);
        setFormData(prev => ({
          ...prev,
          dateFrom: info.dateStr,
          dateTo: info.dateStr
        }));
      }
    }
  };

  const handleSubmit = () => {
    if (!formData.text || !formData.dateFrom || !formData.dateTo) {
      toast.error("Please fill in all required fields");
      return;
    }

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
    toast.success("Event added successfully");
  };

  const customButtons = {
    filterButton: {
      text: '',
      click: () => setIsFilterModalOpen(true),
      icon: 'filter'
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold text-gray-800 mb-3">Calendar</h1>
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
        <ResizablePanel defaultSize={80}>
          <div className="h-full">
            <FullCalendar
              plugins={[resourceTimelinePlugin]}
              initialView="resourceTimelineWeek"
              resources={resources}
              events={events}
              slotDuration="04:00:00"
              slotLabelInterval="04:00:00"
              headerToolbar={{
                left: "prev,next today filterButton",
                center: "title",
                right: "resourceTimelineDay,resourceTimelineThreeDay,resourceTimelineWeek,resourceTimelineMonth"
              }}
              customButtons={customButtons}
              views={{
                resourceTimelineThreeDay: {
                  type: 'resourceTimeline',
                  duration: { days: 3 },
                  buttonText: '3 days'
                }
              }}
              height="100%"
              resourceGroupField="group"
              eventClassNames="text-sm"
              slotLabelClassNames="text-sm"
              resourceLabelClassNames="text-xs"
              resourceAreaWidth="15%"
              dayHeaderClassNames="text-sm"
              resourceGroupLabelClassNames="text-xs"
              buttonText={{
                today: 'Today',
                month: 'Month',
                week: 'Week',
                day: 'Day'
              }}
              titleFormat={{ 
                month: 'short',
                year: 'numeric',
                day: 'numeric'
              }}
              buttonIcons={{
                prev: 'chevron-left',
                next: 'chevron-right'
              }}
              droppable={true}
              eventReceive={handleDrop}
            />
          </div>
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={20}>
          <div className="h-full p-4 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Available Jobs</h2>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterModalOpen(true)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                {getActiveFiltersCount(filterState) > 0 && (
                  <Badge 
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                  >
                    {getActiveFiltersCount(filterState)}
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-3">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  {...card}
                  draggable
                  onDragStart={() => handleDragStart(card.id)}
                  onDragEnd={handleDragEnd}
                  isDragging={draggedCard === card.id}
                  isEvent={false}
                />
              ))}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[1024px]">
          <DialogHeader>
            <DialogTitle>Move Card to Events</DialogTitle>
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
                  {selectedCard && (
                    <div className="space-y-2">
                      <p><strong>Title:</strong> {selectedCard.title}</p>
                      <p><strong>Description:</strong> {selectedCard.description}</p>
                      <p><strong>Group:</strong> {selectedCard.group}</p>
                    </div>
                  )}
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

      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter</DialogTitle>
            <DialogDescription>
              Select your filter criteria below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <MultiSelect
                options={statusOptions}
                selected={filterState.statuses}
                onChange={(value) => setFilterState(prev => ({ ...prev, statuses: value }))}
                placeholder="Select status"
              />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <MultiSelect
                options={priorityOptions}
                selected={filterState.priorities}
                onChange={(value) => setFilterState(prev => ({ ...prev, priorities: value }))}
                placeholder="Select priority"
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

export default CalendarPage;
