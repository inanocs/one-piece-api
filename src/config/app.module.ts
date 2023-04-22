import { Module } from '@nestjs/common'
import { PingController } from '../controllers/ping/ping.controller'
import { ConfigModule } from '@nestjs/config'
import configuration from './env.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
  ],
  controllers: [PingController],
})
export class AppModule {}
