import { Controller, Get, Query } from '@nestjs/common';
import { VirtualService } from './virtual.service';

@Controller('virtual')
export class VirtualController {
  constructor(private readonly virtualService: VirtualService) {}

  @Get('search')
  async searchGoogle(@Query('q') keyword: string): Promise<string[]> {
    if (!keyword) {
      return ['Please provide a search keyword using ?q=keyword'];
    }
    return await this.virtualService.searchGoogle(keyword);
  }
}
