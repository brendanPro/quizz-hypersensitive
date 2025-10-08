import { Context } from '@netlify/functions';
import { CustomRequest } from '../../share/custom-request';
import { saveResult } from './save-result';
import { deleteResult } from './delete-result';
import { getResult } from './get-result';

export default async (request: Request, context: Context) => {
  const customRequest = new CustomRequest(request);
  try {
    if (customRequest.isCorsPreflight()) return customRequest.getCorsResponse();
    switch (customRequest.getMethod()) {
      case 'POST':
        return saveResult(customRequest);
      case 'DELETE':
        return deleteResult(customRequest);
      case 'GET':
        return getResult(customRequest);
      case 'OPTIONS':
        return customRequest.getCorsResponse();
      default:
        return customRequest.getInvalideMethodResponse();
    }
    // implement a crud api
  } catch (error: Error | unknown) {
    if (!(error instanceof Error)) error = new Error(String(error));
    return customRequest.getInternalErrorResponse(error as Error);
  }
};
