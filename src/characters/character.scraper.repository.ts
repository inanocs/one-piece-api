import { CharacterRepository } from './character.repository'
import {
  SanitizerOpts,
  DEFAULT_SANITIZER_OPTIONS,
} from 'src/util/string.sanitizer'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { SCRAPER_REPOSITORY_PROVIDER, Scraper } from 'src/scraper/scraper'
import { CharacterDB, getStatusFromValue, Character } from './character'
import * as CHARACTERS_DB from 'src/characters/db.json'
interface CharacterFilter {
  selector: string
  sanityOpts: SanitizerOpts
}

@Injectable()
export default class CharacterScraperRepository implements CharacterRepository {
  private logger: Logger = new Logger(CharacterScraperRepository.name)

  private ASIDE_SELECTOR = '#mw-content-text > div > aside .pi-data-label'
  public constructor(
    @Inject(SCRAPER_REPOSITORY_PROVIDER) private readonly scraper: Scraper,
  ) {}

  private propFilters: Record<string, CharacterFilter> = {
    race: {
      selector: 'raza',
      sanityOpts: DEFAULT_SANITIZER_OPTIONS,
    },
    bloodType: {
      selector: 'grupo sanguineo',
      sanityOpts: { ...DEFAULT_SANITIZER_OPTIONS, noBrackets: true },
    },
    birthday: {
      selector: 'fecha de nacimiento',
      sanityOpts: { ...DEFAULT_SANITIZER_OPTIONS, noBrackets: true },
    },
    affiliations: {
      selector: 'afiliaciones',
      sanityOpts: DEFAULT_SANITIZER_OPTIONS,
    },
    bounties: {
      selector: 'recompensa',
      sanityOpts: {
        ...DEFAULT_SANITIZER_OPTIONS,
        noBrackets: true,
        removeSpaces: true,
      },
    },
    roles: {
      selector: 'ocupaciones',
      sanityOpts: DEFAULT_SANITIZER_OPTIONS,
    },
    status: {
      selector: 'estado',
      sanityOpts: DEFAULT_SANITIZER_OPTIONS,
    },
  }

  public async getById(id: string): Promise<Character> {
    const character = await this.getCharacterFromJson(id)
    await this.scraper.readHtml(character.url, this.ASIDE_SELECTOR)
    return {
      id: character.id,
      name: character.name,
      race: this.scraper.getValueForLabel(
        this.propFilters.race.selector,
        this.propFilters.race.sanityOpts,
      ),
      birthday: this.scraper.getValueForLabel(
        this.propFilters.birthday.selector,
        this.propFilters.birthday.sanityOpts,
      ),
      bloodType: this.scraper.getValueForLabel(
        this.propFilters.bloodType.selector,
        this.propFilters.bloodType.sanityOpts,
      ),
      affiliations: this.scraper.getListValuesForLabel(
        this.propFilters.affiliations.selector,
        this.propFilters.affiliations.sanityOpts,
        '; ',
      ),
      bounties: this.scraper.getListNumberValuesForLabel(
        this.propFilters.bounties.selector,
        this.propFilters.bounties.sanityOpts,
        ' ',
      ),
      roles: this.scraper.getListValuesForLabel(
        this.propFilters.roles.selector,
        this.propFilters.roles.sanityOpts,
        '; ',
      ),
      status: getStatusFromValue(
        this.scraper.getValueForLabel(
          this.propFilters.status.selector,
          this.propFilters.status.sanityOpts,
        ),
      ),
    }
  }

  private async getCharacterFromJson(id: string): Promise<CharacterDB> {
    const characters = CHARACTERS_DB as unknown as CharacterDB[]
    const character = characters.find((character) => character.id === id)
    if (!character) {
      throw new Error(`Character not found for ID ${id}`)
    }
    this.logger.log(`Found character ${JSON.stringify(character)}`)
    return character
  }
}
