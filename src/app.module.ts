import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoTypeModule } from './video-type/video-type.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [VideoTypeModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
