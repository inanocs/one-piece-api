import { Inject, Injectable } from '@nestjs/common'
import { Character } from './character'
import {
  CHARACTER_REPOSITORY_PROVIDER,
  CharacterRepository,
} from './character.repository'

@Injectable()
export default class PirateService {
  public constructor(
    @Inject(CHARACTER_REPOSITORY_PROVIDER)
    private characterRepository: CharacterRepository,
  ) {}

  public async getCharacter(id: string): Promise<Character> {
    return this.characterRepository.getById(id)
  }
}
