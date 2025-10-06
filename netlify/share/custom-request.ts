const corsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin ?? '*',
  Vary: 'Origin',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
});
const VALID_METHODES = ['GET', 'POST', 'DELETE'];
export class CustomRequest {
  body: any;
  constructor(private readonly request: Request) {}

  async getBody() {
    if (this.body) return this.body;

    this.body = this.request.json();
    return this.body;
  }

  isRequestMethodValid(): boolean {
    return VALID_METHODES.includes(this.request.method);
  }

  isCorsPreflight(): boolean {
    return this.request.method === 'OPTIONS';
  }

  getUrl(): URL {
    return new URL(this.request.url);
  }

  getCorsResponse(): Response {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(this.request.headers.get('origin')),
    });
  }

  getInvalideMethodResponse(): Response {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: corsHeaders(this.request.headers.get('origin')),
    });
  }

  getSuccessRequest(body: any): Response {
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(this.request.headers.get('origin')),
      },
    });
  }

  getCreatedRequest(body: any): Response {
    return new Response(JSON.stringify(body), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(this.request.headers.get('origin')),
      },
    });
  }

  getBadRequestResponse(): Response {
    return new Response('Bad Request', {
      status: 400,
      headers: corsHeaders(this.request.headers.get('origin')),
    });
  }

  getInternalErrorResponse(error: Error): Response {
    return new Response((error as Error).toString(), {
      status: 500,
      headers: corsHeaders(this.request.headers.get('origin')),
    });
  }

  getUnauthorizedResponse(): Response {
    return new Response('Unauthorized', {
      status: 401,
      headers: corsHeaders(this.request.headers.get('origin')),
    });
  }
}
