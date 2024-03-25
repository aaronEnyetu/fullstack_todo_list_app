/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service';


type SignUpDto = {
  name: string;
  email: string;
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  
  @Post('sign-up')
  signUP(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }
}