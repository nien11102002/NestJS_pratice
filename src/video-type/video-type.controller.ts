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

@Controller('video-type')
export class VideoTypeController {
  constructor(private readonly videoTypeService: VideoTypeService) {}

  @Post()
  create(@Body() createVideoTypeDto: CreateVideoTypeDto) {
    return this.videoTypeService.create(createVideoTypeDto);
  }

  @Get()
  findAll() {
    return this.videoTypeService.findAll();
  }

  @Get('video-type')
  async getVideoType(
    @Query('page') page: string,
    @Headers('accessToken') accessToken: string,
    @Req() req: Request,
  ) {
    console.log({ page, accessToken });
    return await this.videoTypeService.getVideoType();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVideoTypeDto: UpdateVideoTypeDto,
  ) {
    return this.videoTypeService.update(+id, updateVideoTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoTypeService.remove(+id);
  }
}
