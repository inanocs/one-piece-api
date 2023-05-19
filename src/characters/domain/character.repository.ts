import { Character } from './Character'

export const CHARACTER_REPOSITORY_PROVIDER = 'CHARACTER_REPOSITORY'

export interface CharacterRepository {
  getById(id: string): Promise<Character | null>
}
