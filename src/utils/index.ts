export async function useFetch<T, P = unknown>(
  input: NodeJS.fetch.RequestInfo,
  init?: RequestInit & { body: P },
): Promise<T> {
  if (typeof input === 'string' && !input.startsWith('http')) {
    const origin = process.env.APP_ORIGIN as string
    return await fetch(origin + input, init).then((res) => res.json())
  } else {
    return await fetch(input, init).then((res) => res.json())
  }
}
