import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { MultiSelect } from './MultiSelect';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

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
    user.name.toLowerCase().includes(filterText.toLowerCase()) &&
    (selectedGroups.length === 0 || selectedGroups.includes(user.group)) &&
    (selectedStatuses.length === 0 || selectedStatuses.includes(user.status))
  );

  const groupedUsers = filteredUsers.reduce((acc, user) => {
    const group = user.group || 'Ungrouped';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(user);
    return acc;
  }, {} as Record<string, User[]>);

  const uniqueGroups = Array.from(new Set(users.map(user => user.group)));
  const uniqueStatuses = ['online', 'offline'];

  // Get all group values for the defaultValue
  const defaultExpandedGroups = Object.keys(groupedUsers);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Resources</h2>
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Resources</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Group</label>
                <MultiSelect
                  options={uniqueGroups}
                  selected={selectedGroups}
                  onChange={setSelectedGroups}
                  placeholder="Select groups"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Status</label>
                <MultiSelect
                  options={uniqueStatuses}
                  selected={selectedStatuses}
                  onChange={setSelectedStatuses}
                  placeholder="Select status"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Accordion 
        type="multiple" 
        className="w-full space-y-2"
        defaultValue={defaultExpandedGroups}
      >
        {Object.entries(groupedUsers).map(([group, users]) => (
          <AccordionItem key={group} value={group} className="border rounded-lg">
            <AccordionTrigger className="px-4">
              <span className="text-sm font-semibold">{group}</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-1 px-2">
              {users.map(user => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{user.status}</span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};