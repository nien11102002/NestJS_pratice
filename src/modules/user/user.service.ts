import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(req: Request) {
    let { page, pageSize } = req.query as any;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 3;

    const skip = (page - 1) * pageSize;
    const totalItem = await this.prisma.users.count();
    const totalPage = Math.ceil(totalItem / pageSize);

    const users = await this.prisma.users.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        created_at: 'asc',
      },
    });

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      items: users || [],
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  uploadAvatar(file: Express.Multer.File) {
    console.log({ file });
    return `AvatarLocal`;
  }
}
