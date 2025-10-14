import { BACKEND_URL, GET_URL_PATH } from '@/constants/backend';
import { Button } from '../ui/button';
import { useState, memo, useCallback, useMemo } from 'react';
import { DateTimePicker24h } from '../customized/date-time-picker/date-time-picker';
import { useQuery } from '@tanstack/react-query';
import ResultList from './ResultList';

export const Admin = memo(function Admin() {
  const [dateFrom, setDateFrom] = useState<Date>(new Date());
  const [dateTo, setDateTo] = useState<Date>(new Date());

  const urlParams = useMemo(
    () => `fromDate=${dateFrom.getTime()}&toDate=${dateTo.getTime()}`,
    [dateFrom, dateTo],
  );

  const { isFetched, isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['admin-token', urlParams],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}${GET_URL_PATH}?${urlParams}`);

      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération du token: ${response.statusText}`);
      }

      return response.json();
    },
    enabled: false,
    select: (data) => data.token,
    retry: 2,
  });

  const getURLToken = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleDateFromChange = useCallback((date: Date) => {
    setDateFrom(date);
  }, []);

  const handleDateToChange = useCallback((date: Date) => {
    setDateTo(date);
  }, []);

  return (
    <div className="text-center py-10 w-2xl mx-auto">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="flex flex-row gap-4">
        <Button
          onClick={getURLToken}
          disabled={isLoading}
          aria-label="Générer l'URL d'accès aux résultats"
        >
          {isLoading ? 'Génération...' : 'Get URL'}
        </Button>
        <div>
          <label htmlFor="date-from" className="sr-only">
            Date de début
          </label>
          <DateTimePicker24h defaultDate={dateFrom} onChange={handleDateFromChange} />
        </div>
        <div>
          <label htmlFor="date-to" className="sr-only">
            Date de fin
          </label>
          <DateTimePicker24h defaultDate={dateTo} onChange={handleDateToChange} />
        </div>
      </div>
      <div className="mt-4">
        {isFetched ? (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-mono text-sm break-all">{`${window.location.origin}/${data}`}</p>
          </div>
        ) : isLoading ? (
          <div role="status" aria-live="polite">
            Chargement...
          </div>
        ) : isError ? (
          <div role="alert" className="text-red-600">
            <p>Erreur: {error?.message}</p>
            <Button onClick={getURLToken} className="mt-2">
              Réessayer
            </Button>
          </div>
        ) : (
          <div className="text-gray-500">Cliquez sur "Get URL" pour générer un lien d'accès</div>
        )}
      </div>

      <div className="mt-8">
        <ResultList />
      </div>
    </div>
  );
});

export default Admin;
