import { HTTP_METHOD } from 'next/dist/server/web/http'
import { headers } from 'next/headers'

export async function myFetch<T, P = unknown>(
  input: NodeJS.fetch.RequestInfo,
  init: RequestInit & { body?: P; method?: HTTP_METHOD } = { headers: headers() },
): Promise<T> {
  if (typeof input === 'string' && !input.startsWith('http')) {
    const origin = process.env.NEXT_PUBLIC_APP_ORIGIN as string
    return await fetch(origin + input, init).then((res) => res.json())
  } else {
    return await fetch(input, init).then((res) => res.json())
  }
}
