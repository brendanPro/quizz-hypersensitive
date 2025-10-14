import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { columns } from './columns';
import { DataTable } from './dataTable';
import { BACKEND_URL, RESULT_HANDLER } from '@/constants/backend';

const ResultList = memo(function ResultList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['results'],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}${RESULT_HANDLER}`);

      if (!response.ok) {
        throw new Error(`Erreur lors du chargement des résultats: ${response.statusText}`);
      }

      return response.json();
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center" role="status" aria-live="polite">
          Chargement des résultats...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center text-red-600" role="alert">
          <p>Erreur lors du chargement des résultats: {error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-xl font-semibold mb-4">Liste des résultats</h2>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
});

export default ResultList;
