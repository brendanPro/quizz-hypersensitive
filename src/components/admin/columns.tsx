import { type ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import ColumnActions from './columnActions';
import type { Result } from '@/types/result';

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <div>{formatDate(date, 'dd/MM/yyyy HH:mm')}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'scoreTotal',
    header: 'Score total',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ColumnActions result={row.original} />;
    },
  },
];
