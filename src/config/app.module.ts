import { Module } from '@nestjs/common'
import { PingController } from '../controllers/ping/ping.controller'
import { ConfigModule } from '@nestjs/config'
import configuration from './env.config'
import { CHARACTER_REPOSITORY_PROVIDER } from 'src/characters/character.repository'
import { PiratesController } from 'src/controllers/pirate.controller'
import { SCRAPER_REPOSITORY_PROVIDER } from 'src/scraper/scraper'
import AsideJSDomScraper from 'src/scraper/aside.jsdom.scraper'
import CharacterScraperRepository from 'src/characters/character.scraper.repository'
import CharacterService from 'src/characters/character.service'

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
      provide: CHARACTER_REPOSITORY_PROVIDER,
      useClass: CharacterScraperRepository,
    },
    {
      provide: SCRAPER_REPOSITORY_PROVIDER,
      useClass: AsideJSDomScraper,
    },
    CharacterService,
  ],
  controllers: [PingController, PiratesController],
})
export class AppModule {}
