import React from 'react';

interface OnlineUsersProps {
  filterText: string;
}

export const OnlineUsers: React.FC<OnlineUsersProps> = ({ filterText }) => {
  const users = [
    { id: 1, name: 'John Doe', status: 'online' },
    { id: 2, name: 'Jane Smith', status: 'offline' },
    { id: 3, name: 'Bob Johnson', status: 'online' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="space-y-2">
      {filteredUsers.map(user => (
        <div key={user.id} className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
};