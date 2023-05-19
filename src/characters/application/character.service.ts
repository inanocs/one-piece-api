import { Inject, Injectable } from '@nestjs/common'
import { Character } from '../domain/character'
import {
  CHARACTER_REPOSITORY_PROVIDER,
  CharacterRepository,
} from '../domain/character.repository'

@Injectable()
export default class CharacterService {
  public constructor(
    @Inject(CHARACTER_REPOSITORY_PROVIDER)
    private characterRepository: CharacterRepository,
  ) {}

  public async getCharacter(id: string): Promise<Character> {
    return this.characterRepository.getById(id)
  }
}
