import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Calendar</h1>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  );
};

export default CalendarPage;