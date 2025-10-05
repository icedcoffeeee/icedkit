export function formToObj(data: FormData) {
  return Object.fromEntries(Array.from(data.entries()).map(([k, v]) => [k, v.toString()]));
}
