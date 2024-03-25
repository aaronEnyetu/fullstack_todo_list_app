/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signUp(signUpDto) {
      console.log('SIGN UP DTO: ', signUpDto);
    // return signUpDto
    return "fake token"
  }
}
