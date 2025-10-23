import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

 class LoginDto {
        mail: string;
        password: string;
    }

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('login')
   @HttpCode(200)
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto.mail, dto.password)
    }

}
