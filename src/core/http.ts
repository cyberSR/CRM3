export async function httpGet<T=any>(url: string): Promise<T> {
  return fetch(url, { headers: { 'Content-Type': 'application/json' } }).then(r => r.json())
}
export async function httpPost<T=any>(url: string, body?: any): Promise<T> {
  return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body ?? {}) }).then(r => r.json())
}
