import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import type { Result } from '@/types/result';
import { BACKEND_URL, RESULT_HANDLER } from '@/constants/backend';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  result: Result;
};
export default function columnActions(props: Props) {
  const queryClient = useQueryClient();
  const { result } = props;

  const handleDelete = async () => {
    try {
      await fetch(`${BACKEND_URL}${RESULT_HANDLER}?id=${result.id}`, {
        method: 'DELETE',
      });
      queryClient.invalidateQueries({ queryKey: ['results'] });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    try {
      const blob = new Blob([JSON.stringify(result.answers, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `result-${result.id}.json`;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDelete}>Delete result</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDownload}>Get full result</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
