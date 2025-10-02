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
    if (!isParamsUrlValid(url)) {
      return new Response('Bad Request', {
        status: 400,
        headers: corsHeaders(origin),
      })
    }
    
    const fromDate = url.searchParams.get('fromDate') ?? ''
    const toDate = url.searchParams.get('toDate') ?? ''
    const body = {
      token: generateURLToken(fromDate, toDate),
    }

    return new Response(JSON.stringify(body), {
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



function generateURLToken(fromDate: string, toDate: string) {
  return Buffer.from(`${fromDate}-${toDate}`).toString('base64')
}

function isParamsUrlValid(url: URL) {
  const fromDate = url.searchParams.get('fromDate')
  const toDate = url.searchParams.get('toDate')

  if (!fromDate || !toDate) {
    return false
  }

  // Accept unix epoch (seconds or milliseconds) or ISO 8601 strings
  const parseToDate = (value: string): Date | null => {
    if (!value) return null

    // Numeric timestamp
    if (/^\d+$/.test(value)) {
      const num = Number(value)
      // Heuristic: 13+ digits = ms, else seconds
      const ms = value.length >= 13 ? num : num * 1000
      const d = new Date(ms)
      return isNaN(d.getTime()) ? null : d
    }

    // ISO or Date.parse compatible
    const time = Date.parse(value)
    if (!isNaN(time)) return new Date(time)

    return null
  }

  const from = parseToDate(fromDate)
  const to = parseToDate(toDate)

  if (!from || !to) return false

  return true
}