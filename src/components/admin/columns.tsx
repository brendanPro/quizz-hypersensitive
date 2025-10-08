import { type ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import ColumnActions from './columnActions';
import type { Result } from '@/types/result';
import { MAX_VALUE_PER_QUESTION, QUESTIONS_LABELS } from '@/constants/questions';

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
    id: 'scorePercent',
    header: 'Score Percent',
    cell: ({ row }) => {
      const max = QUESTIONS_LABELS.length * MAX_VALUE_PER_QUESTION;
      const score = row.original.scoreTotal;
      const percent = Math.round((score / max) * 100);
      return <div>{percent}%</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ColumnActions result={row.original} />;
    },
  },
];
