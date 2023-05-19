import { readFile } from 'fs/promises'

export async function readJsonFromPath<T>(path: string): Promise<T> {
  const file = await readFile(path, 'utf-8')
  return JSON.parse(file) as unknown as T
}
