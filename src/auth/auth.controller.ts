import { Controller, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { Public } from '../common/decorators/isPublic';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  signUp(@Body() user: SignUpDto) {
    return this.authService.signUp(user);
  }
  @Public()
  @Post('login')
  @HttpCode(200)
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }
}
