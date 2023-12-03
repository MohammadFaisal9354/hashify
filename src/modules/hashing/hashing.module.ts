import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { HashingController } from './hashing.controller';

@Module({
  imports: [],
  controllers: [HashingController],
  providers: [HashingService],
})
export class HashingModule {}
