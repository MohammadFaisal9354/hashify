import { Controller, Get, Query } from '@nestjs/common';
import { HashingService } from './hashing.service';

@Controller()
export class HashingController {
  constructor(private readonly hashingService: HashingService) {}

  @Get()
  getHashed(@Query('value') input: string, @Query('key') key: string): any {
    return this.hashingService.getHashed(input, key);
  }
}
