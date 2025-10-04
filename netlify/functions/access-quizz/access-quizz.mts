import { Context } from '@netlify/functions';
import { isAfter, isBefore } from 'date-fns';
import { CustomRequest } from '../../share/custom-request';
import { decrypt } from '../../share/crypto';

export default async (request: Request, context: Context) => {
  try {
    const customRequest = new CustomRequest(request);
    const url = new URL(customRequest.url);

    if (customRequest.isCorsPreflight()) return customRequest.getCorsResponse();
    if (customRequest.isRequestMethodValid()) return customRequest.getInvalideMethodResponse();
    const key = url.searchParams.get('key');
    if (!key) return customRequest.getBadRequestResponse();

    const { fromDate, toDate } = getAvilableDates(key);
    const now = new Date();
    if (!(isBefore(now, toDate) && isAfter(now, fromDate)))
      return customRequest.getBadRequestResponse();

    const body = undefined;

    return customRequest.getSuccessRequest(body);
  } catch (error) {
    const customRequest = new CustomRequest(request);
    return customRequest.getInternalErrorResponse(error);
  }
};

function getAvilableDates(key: string): { fromDate: Date; toDate: Date } {
  const [fromDatetimeStamp, toDateTimestamp] = decrypt(key)
    .split('-')
    .map((d) => parseInt(d));

  return {
    fromDate: new Date(fromDatetimeStamp),
    toDate: new Date(toDateTimestamp),
  };
}
