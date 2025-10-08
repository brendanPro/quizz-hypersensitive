import { useQuery } from '@tanstack/react-query';
import { columns } from './columns';
import { DataTable } from './dataTable';
import { BACKEND_URL, RESULT_HANDLER } from '@/constants/backend';

export default function ResultList() {
  const { data } = useQuery({
    queryKey: ['results'],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}${RESULT_HANDLER}`);
      return response.json();
    },
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
