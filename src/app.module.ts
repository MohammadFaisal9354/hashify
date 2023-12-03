import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HashingModule } from './modules/hashing/hashing.module';

@Module({
  imports: [HashingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
