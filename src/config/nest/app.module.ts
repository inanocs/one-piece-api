import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from '../env.config'
import { CHARACTER_REPOSITORY_PROVIDER } from 'src/characters/domain/character.repository'
import { CharacterController } from 'src/characters/infra/rest/character.controller'
import { SCRAPER_REPOSITORY_PROVIDER } from 'src/scraper/domain/scraper'
import AsideJSDomScraper from 'src/scraper/infra/jsdom/aside.jsdom.scraper'
import CharacterScraperRepository from 'src/characters/infra/db/scraper/character.scraper.repository'
import CharacterService from 'src/characters/application/character.service'
import { APP_FILTER } from '@nestjs/core'
import { HttpErrorFilter } from 'src/shared/error/infra/rest/http-error.filter'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: CHARACTER_REPOSITORY_PROVIDER,
      useClass: CharacterScraperRepository,
    },
    {
      provide: SCRAPER_REPOSITORY_PROVIDER,
      useClass: AsideJSDomScraper,
    },
    CharacterService,
  ],
  controllers: [CharacterController],
})
export class AppModule {}
