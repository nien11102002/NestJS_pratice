import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { TUserAccount } from 'src/common/types/types';
import { JwtService } from '@nestjs/jwt';
import {
  ACCESS_TOKEN_EXPIRES,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constants/app.constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, pass_word } = loginDto;
    console.log({ email, pass_word });

    const userExists = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        user_id: true,
        pass_word: true,
      },
    });
    if (!userExists)
      throw new BadRequestException('Email không tồn tại, vui lòng đăng ký');

    console.log({ userExists });
    const passHash = userExists.pass_word;
    const isPassword = bcrypt.compareSync(pass_word, passHash);
    if (!isPassword) throw new BadRequestException(`Mật khẩu không chính xác`);

    const tokens = this.createTokens(userExists);

    return tokens;
  }

  createTokens(userExists: TUserAccount) {
    const accessToken = this.jwtService.sign(
      { user_id: userExists.user_id },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES'),
      },
    );

    const refreshToken = this.jwtService.sign(
      { user_id: userExists.user_id },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES'),
      },
    );

    return { accessToken, refreshToken };
  }
}
