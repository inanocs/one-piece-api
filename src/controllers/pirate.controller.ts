import { Controller, Get, Logger, Param } from '@nestjs/common'
import PirateService from 'src/characters/character.service'

@Controller('/characters')
export class PiratesController {
  private readonly logger: Logger = new Logger(PiratesController.name)
  public constructor(private service: PirateService) {}
  @Get(':id')
  async getPirate(@Param('id') id: string) {
    this.logger.log(`Got param ${id}`)
    return this.service.getCharacter(id)
  }
}
