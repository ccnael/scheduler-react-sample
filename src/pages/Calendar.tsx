import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { Card } from "@/components/Card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const CalendarPage = () => {
  const [resources] = useState([
    { id: "a", title: "Resource A" },
    { id: "b", title: "Resource B" },
    { id: "c", title: "Resource C" },
  ]);

  const [events] = useState([
    {
      title: "Event 1",
      start: new Date(),
      resourceId: "a",
    },
    {
      title: "Event 2",
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      resourceId: "b",
    },
  ]);

  const [cards] = useState([
    { id: 1, title: 'Task 1', description: 'Complete the project setup' },
    { id: 2, title: 'Task 2', description: 'Design the user interface' },
    { id: 3, title: 'Task 3', description: 'Implement core features' },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Calendar</h1>
      <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
        <ResizablePanel defaultSize={80}>
          <div className="h-full">
            <FullCalendar
              plugins={[resourceTimelinePlugin]}
              initialView="resourceTimelineWeek"
              resources={resources}
              events={events}
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
            />
          </div>
        </ResizablePanel>
        
        <ResizableHandle />
        
        <ResizablePanel defaultSize={20}>
          <div className="h-full p-4 bg-white">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Jobs</h2>
            <div className="space-y-4">
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