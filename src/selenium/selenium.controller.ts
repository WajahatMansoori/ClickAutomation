import { Controller,Get  } from '@nestjs/common';
import { SeleniumService } from './selenium.service';

@Controller('selenium')
export class SeleniumController {
    constructor(private readonly seleniumService: SeleniumService) {}
  
    @Get('fill-form')
    async fillForm(): Promise<{ message: string }> {
      const result = await this.seleniumService.fillContactForm();
      return { message: result };
    }
  }
