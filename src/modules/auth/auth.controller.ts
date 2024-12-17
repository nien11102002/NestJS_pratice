import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ResponseMessage(`Login successfully`)
  @Post(`login`)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
