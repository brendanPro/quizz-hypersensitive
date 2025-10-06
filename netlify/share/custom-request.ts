const corsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin ?? '*',
  Vary: 'Origin',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
});

export class CustomRequest extends Request {
  constructor(private readonly request: Request) {
    super(request);
  }

  isRequestMethodValid(): boolean {
    return this.method !== 'GET';
  }

  isCorsPreflight(): boolean {
    return this.method === 'OPTIONS';
  }

  getCorsResponse(): Response {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(this.headers.get('origin')),
    });
  }

  getInvalideMethodResponse(): Response {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: corsHeaders(this.headers.get('origin')),
    });
  }

  getSuccessRequest(body: any): Response {
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(this.headers.get('origin')),
      },
    });
  }

  getBadRequestResponse(): Response {
    return new Response('Bad Request', {
      status: 400,
      headers: corsHeaders(this.headers.get('origin')),
    });
  }

  getInternalErrorResponse(error: Error): Response {
    return new Response((error as Error).toString(), {
      status: 500,
      headers: corsHeaders(this.headers.get('origin')),
    });
  }

  getUnauthorizedResponse(): Response {
    return new Response('Unauthorized', {
      status: 401,
      headers: corsHeaders(this.headers.get('origin')),
    });
  }
}
