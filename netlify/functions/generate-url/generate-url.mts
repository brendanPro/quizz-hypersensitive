import { Context } from '@netlify/functions'

const corsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin ?? '*',
  'Vary': 'Origin',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
})

export default async (request: Request, context: Context) => {
  try {
    const url = new URL(request.url)
    const origin = request.headers.get('origin')

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin),
      })
    }

    if (request.method !== 'GET') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: corsHeaders(origin),
      })
    }

    const subject = url.searchParams.get('name') || 'World'
    const body = JSON.stringify({ message: `Hello ${subject}` })

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(origin),
      },
    })
  } catch (error) {
    return new Response((error as Error).toString(), {
      status: 500,
      headers: corsHeaders(request.headers.get('origin')),
    })
  }
}
