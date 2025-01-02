import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Calendar</h1>
      <div className="h-[600px]">
        <FullCalendar
          plugins={[resourceTimelinePlugin]}
          initialView="resourceTimelineWeek"
          resources={resources}
          events={events}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth"
          }}
          height="100%"
        />
      </div>
    </div>
  );
};

export default CalendarPage;