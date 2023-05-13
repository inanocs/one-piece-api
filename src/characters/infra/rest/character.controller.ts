import { Controller, Get, Logger, Param } from '@nestjs/common'
import CharacterService from 'src/characters/application/character.service'

@Controller('/characters')
export class CharacterController {
  private readonly logger: Logger = new Logger(CharacterController.name)
  public constructor(private service: CharacterService) {}
  @Get(':id')
  async getCharacter(@Param('id') id: string) {
    this.logger.log(`Got param ${id}`)
    return this.service.getCharacter(id)
  }
}
