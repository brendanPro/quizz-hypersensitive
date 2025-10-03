import { Context } from '@netlify/functions';
import { CustomRequest } from '../../share/custom-request';
import { encrypt } from '../../share/crypto';

export default async (request: Request, context: Context) => {
  try {
    const customRequest = new CustomRequest(request);
    const url = new URL(customRequest.url);

    if (customRequest.isCorsPreflight()) return customRequest.getCorsResponse();
    if (customRequest.isRequestMethodValid()) return customRequest.getInvalideMethodResponse();
    if (!isParamsUrlValid(url)) return customRequest.getBadRequestResponse();

    const fromDate = url.searchParams.get('fromDate') ?? '';
    const toDate = url.searchParams.get('toDate') ?? '';
    const body = {
      token: generateURLToken(fromDate, toDate),
    };

    return customRequest.getSuccessRequest(body);
  } catch (error) {
    const customRequest = new CustomRequest(request);
    return customRequest.getInternalErrorResponse(error);
  }
};

function generateURLToken(fromDate: string, toDate: string) {
  return encrypt(`${fromDate}-${toDate}`);
}

function isParamsUrlValid(url: URL) {
  const fromDate = url.searchParams.get('fromDate');
  const toDate = url.searchParams.get('toDate');

  if (!fromDate || !toDate) {
    return false;
  }

  const from = parseToDate(fromDate);
  const to = parseToDate(toDate);

  if (!from || !to) return false;

  return true;
}

// Accept unix epoch (seconds or milliseconds) or ISO 8601 strings
function parseToDate(value: string): Date | null {
  if (!value) return null;

  // Numeric timestamp
  if (/^\d+$/.test(value)) {
    const num = Number(value);
    // Heuristic: 13+ digits = ms, else seconds
    const ms = value.length >= 13 ? num : num * 1000;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  }

  // ISO or Date.parse compatible
  const time = Date.parse(value);
  if (!isNaN(time)) return new Date(time);

  return null;
}
