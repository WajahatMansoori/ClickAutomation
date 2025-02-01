import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeleniumService } from './selenium/selenium.service';
import { SeleniumController } from './selenium/selenium.controller';
import { VirtualController } from './virtual/virtual.controller';
import { VirtualService } from './virtual/virtual.service';

@Module({
  imports: [],
  controllers: [AppController, SeleniumController, VirtualController],
  providers: [AppService, SeleniumService, VirtualService],
})
export class AppModule {}
