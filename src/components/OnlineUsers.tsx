import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: number;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
}

export const OnlineUsers = () => {
  // Mock data for demonstration
  const users: User[] = [
    { id: 1, name: 'John Doe', status: 'online' },
    { id: 2, name: 'Jane Smith', status: 'online' },
    { id: 3, name: 'Mike Johnson', status: 'away' },
    { id: 4, name: 'Sarah Wilson', status: 'online' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Team Members</h2>
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
    </div>
  );
};