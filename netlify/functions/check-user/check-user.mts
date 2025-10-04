import { Context } from '@netlify/functions';
import { CustomRequest } from '../../share/custom-request';

const authorizedUsers = process.env.AUTHORIZED_USERS?.split(',');

export default async (request: Request, context: Context) => {
  try {
    const customRequest = new CustomRequest(request);
    const url = new URL(customRequest.url);

    if (customRequest.isCorsPreflight()) return customRequest.getCorsResponse();
    if (customRequest.isRequestMethodValid()) return customRequest.getInvalideMethodResponse();
    if (isParamsValid(url)) return customRequest.getBadRequestResponse();

    const userEmail = getUserEmail(url);
    if (!authorizedUsers?.includes(userEmail)) return customRequest.getUnauthorizedResponse();

    const body = undefined;

    return customRequest.getSuccessRequest(body);
  } catch (error) {
    const customRequest = new CustomRequest(request);
    return customRequest.getInternalErrorResponse(error);
  }
};

function isParamsValid(url: URL): boolean {
  return !(url.searchParams.get('user') === null || url.searchParams.get('user') === undefined);
}

function getUserEmail(url: URL): string {
  const userEmail = url.searchParams.get('user');
  return userEmail ?? '';
}
