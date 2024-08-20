import { HTTP_METHOD } from 'next/dist/server/web/http'

export { default as cs } from 'classnames'

export async function myFetch<T extends Response, P = unknown>(
  input: string | URL | globalThis.Request,
  init: RequestInit & { body?: P; method?: HTTP_METHOD },
  originData?: boolean,
): Promise<T> {
  return await fetch(input, init).then((res) => (originData ? res : res.json()))
}
