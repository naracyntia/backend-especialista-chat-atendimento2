import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

 class LoginDto {
        mail: string;
        password: string;
    }

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('auth')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto.mail, dto.password)
    }

}
