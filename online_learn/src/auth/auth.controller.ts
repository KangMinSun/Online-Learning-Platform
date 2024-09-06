import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';


@ApiTags('user')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiBody({
    schema: {
      properties: {
        id: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: { id: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.id, loginDto.password);
    if (!user) {
      return { message: 'Invalid ID or password' };
    }
    return this.authService.login(user);
  }
}
