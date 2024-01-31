export function makeFetching<T>() {
  const cache = new Map<string, Promise<T>>();
  return function fetchData(name: string, queryFn: () => Promise<T>) {
    if (!cache.has(name)) {
      cache.set(name, queryFn());
    }
    return cache.get(name)!;
  };
}
