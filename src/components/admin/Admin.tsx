import { BACKEND_URL, GET_URL_PATH } from '@/constants/backend';
import { Button } from '../ui/button';
import { useState } from 'react';
import { DateTimePicker24h } from '../customized/date-time-picker/date-time-picker';
import { useQuery } from '@tanstack/react-query';
import { isError } from 'util';

export function Admin() {
  // const [data, setData] = useState<any>(null);
  const [dateFrom, setDateFrom] = useState<Date>(new Date());
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [showUrl, setShowUrl] = useState<boolean>(false);

  const { isFetched, isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['token'],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}${GET_URL_PATH}?${getURLParams()}`);
      return response.json();
    },
    enabled: false,
    select: (data) => data.token,
  });

  const getURLToken = () => {
    refetch();
  };

  const getURLParams = () => {
    return `fromDate=${dateFrom.getTime()}&toDate=${dateTo.getTime()}`;
  };

  return (
    <div className="text-center py-10 w-2xl mx-auto">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="flex flex-row gap-4">
        <Button onClick={getURLToken}>Get URL</Button>
        <div>
          <DateTimePicker24h defaultDate={dateFrom} onChange={setDateFrom} />
        </div>
        <div>
          <DateTimePicker24h defaultDate={dateTo} onChange={setDateTo} />
        </div>
      </div>
      <div className="mt-4">
        {isFetched ? (
          `${window.location.origin}?key=${data}`
        ) : isLoading ? (
          'loading...'
        ) : isError ? (
          <p>{error.message}</p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Admin;
