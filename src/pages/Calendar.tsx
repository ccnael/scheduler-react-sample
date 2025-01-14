import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { Card } from "@/components/Card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

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
                left: "prev,next today",
                center: "title",
                right: "resourceTimelineDay,resourceTimelineThreeDay,resourceTimelineWeek,resourceTimelineMonth"
              }}
              views={{
                resourceTimelineThreeDay: {
                  type: 'resourceTimeline',
                  duration: { days: 3 },
                  buttonText: '3 days'
                }
              }}
              height="100%"
              resourceGroupField="group"
              eventClassNames="text-[10px]"
              slotLabelClassNames="text-[10px]"
              resourceLabelClassNames="text-[10px]"
              buttonText={{
                today: 'Today',
                month: 'M',
                week: 'W',
                day: 'D'
              }}
              dayHeaderClassNames="text-[10px]"
              titleFormat={{ 
                month: 'short',
                year: 'numeric',
                day: 'numeric'
              }}
              buttonIcons={{
                prev: 'chevron-left',
                next: 'chevron-right'
              }}
            />
          </div>
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={20}>
          <div className="h-full p-4 bg-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Available Jobs</h2>
            <div className="space-y-3">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  {...card}
                  draggable
                  onDragStart={() => console.log('Drag started:', card.id)}
                  onDragEnd={() => console.log('Drag ended:', card.id)}
                />
              ))}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CalendarPage;