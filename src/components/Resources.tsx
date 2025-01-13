import React from 'react';

interface User {
  id: number;
  name: string;
  status: 'online' | 'offline';
  group: string;
}

interface ResourcesProps {
  filterText: string;
}

export const Resources: React.FC<ResourcesProps> = ({ filterText }) => {
  const users: User[] = [
    { id: 1, name: 'John Doe', status: 'online', group: 'Development' },
    { id: 2, name: 'Jane Smith', status: 'offline', group: 'Design' },
    { id: 3, name: 'Bob Johnson', status: 'online', group: 'Development' },
    { id: 4, name: 'Alice Williams', status: 'online', group: 'QA' },
    { id: 5, name: 'Charlie Brown', status: 'offline', group: 'Documentation' },
    { id: 6, name: 'Diana Prince', status: 'online', group: 'Design' },
    { id: 7, name: 'Edward Stone', status: 'online', group: 'Development' },
    { id: 8, name: 'Fiona Apple', status: 'offline', group: 'Research' },
    { id: 9, name: 'George Miller', status: 'online', group: 'Security' },
    { id: 10, name: 'Helen Carter', status: 'online', group: 'Development' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const groupedUsers = filteredUsers.reduce((acc, user) => {
    const group = user.group || 'Ungrouped';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(user);
    return acc;
  }, {} as Record<string, User[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedUsers).map(([group, users]) => (
        <div key={group} className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 border-b pb-1">{group}</h3>
          {users.map(user => (
            <div key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <span className="text-xs text-gray-500">{user.status}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};