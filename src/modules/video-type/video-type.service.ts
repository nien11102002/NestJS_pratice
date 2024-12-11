import { Injectable } from '@nestjs/common';
import { CreateVideoTypeDto } from './dto/create-video-type.dto';
import { UpdateVideoTypeDto } from './dto/update-video-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async getVideoType() {
    const result = await this.prisma.video_type.findMany();

    return result;
  }

  async getDetailVideoType(id: string) {
    const result = await this.prisma.video_type.findUnique({
      where: {
        type_id: Number(id),
      },
    });

    return result;
  }
  async createVideoType(body: CreateVideoTypeDto) {
    const newVideoType = await this.prisma.video_type.create({
      data: {
        type_name: body.type_name,
        icon: body.icon,
      },
    });

    return newVideoType;
  }
}
