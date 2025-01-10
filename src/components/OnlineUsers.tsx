import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface User {
  id: number;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  group: 'A' | 'B';
}

export const OnlineUsers = () => {
  // Mock data for demonstration
  const users: User[] = [
    { id: 1, name: 'John Doe', status: 'online', group: 'A' },
    { id: 2, name: 'Jane Smith', status: 'online', group: 'A' },
    { id: 4, name: 'Sarah Wilson', status: 'online', group: 'A' },
    { id: 3, name: 'Mike Johnson', status: 'away', group: 'B' },
  ];

  // Group users by group
  const groupedUsers = users.reduce((acc, user) => {
    if (!acc[user.group]) {
      acc[user.group] = [];
    }
    acc[user.group].push(user);
    return acc;
  }, {} as Record<string, User[]>);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Team Members</h2>
      <Accordion type="multiple" defaultValue={["A", "B"]} className="w-full">
        {Object.entries(groupedUsers).map(([group, users]) => (
          <AccordionItem value={group} key={group}>
            <AccordionTrigger className="capitalize">
              Group {group} ({users.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.status}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === 'online' ? 'bg-green-500' :
                      user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-300'
                    }`} />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};