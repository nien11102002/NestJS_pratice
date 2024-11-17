import { Injectable } from '@nestjs/common';
import { CreateVideoTypeDto } from './dto/create-video-type.dto';
import { UpdateVideoTypeDto } from './dto/update-video-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoTypeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVideoTypeDto: CreateVideoTypeDto) {
    return 'This action adds a new videoType';
  }

  findAll() {
    return `This action returns all videoType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videoType`;
  }

  update(id: number, updateVideoTypeDto: UpdateVideoTypeDto) {
    return `This action updates a #${id} videoType`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoType`;
  }

  getVideoType() {
    return 'getVideoType';
  }
}
