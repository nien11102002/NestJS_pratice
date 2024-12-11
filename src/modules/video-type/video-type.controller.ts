import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  Req,
} from '@nestjs/common';
import { VideoTypeService } from './video-type.service';
import { CreateVideoTypeDto } from './dto/create-video-type.dto';
import { UpdateVideoTypeDto } from './dto/update-video-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`Video`)
@Controller('video')
export class VideoTypeController {
  constructor(private readonly videoTypeService: VideoTypeService) {}

  @Get('video-type')
  async getVideoType(
    // @Query('page') page: string,
    // @Headers('accessToken') accessToken: string,
    @Req() req: Request,
  ) {
    return await this.videoTypeService.getVideoType();
  }

  @Get('video-type-detail/:id')
  async getDetailVideoType(@Param(`id`) videoTypeId: string) {
    console.log({ videoTypeId });

    return await this.videoTypeService.getDetailVideoType(videoTypeId);
  }

  @Post(`create-video-type`)
  async createVideoType(@Body(`body`) body: CreateVideoTypeDto) {
    return await this.videoTypeService.createVideoType(body);
  }
}
