'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';
import SearchBar from './search-bar';

// Dummy user data
const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    role: 'Moderator',
    status: 'Active',
  },
];

export default function UserTable() {
  return (
    <div className='space-y-6'>
      <SearchBar />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge
                  variant={user.status === 'Active' ? 'outline' : 'destructive'}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className='text-right space-x-2'>
                <Button variant='outline' size='sm'>
                  <Eye size={16} />
                </Button>
                <Button variant='outline' size='sm'>
                  <Edit size={16} />
                </Button>
                <Button variant='destructive' size='sm'>
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
