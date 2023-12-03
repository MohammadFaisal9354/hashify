import { Controller, Get, Param, Query } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { Algorithm_types } from 'src/types/types';

@Controller('hashing')
export class HashingController {
  constructor(private readonly hashingService: HashingService) {}

  @Get()
  getHashed(@Query('value') input: string, @Query('key') key: string): any {
    return this.hashingService.getHashed(input, key);
  }
  @Get('supported-algorithms')
  getSupportedAlgorithm() {
    return this.hashingService.supportedAlogorithms();
  }
  // @Get('test')
  // test() {
  //   return this.hashingService.testHashingAlgorithms();
  // }
  @Get(':algo')
  getHashedByAlgo(
    @Param('algo') algo: Algorithm_types,
    @Query('value') input: string,
    @Query('key') key: string,
  ): any {
    return this.hashingService.hashValue(input, algo, key);
  }
}
