import { Link, useLocation } from "react-router-dom";
import { Calendar, Kanban } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b mb-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex h-16 items-center justify-start">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/" ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Kanban className="h-4 w-4" />
              <span>Board</span>
            </Link>
            <Link
              to="/calendar"
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                location.pathname === "/calendar" ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};