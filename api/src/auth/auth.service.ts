/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }
  
  signUp(signUpDto) {
      console.log('SIGN UP DTO: ', signUpDto);
    // return signUpDto
    return "fake token"
  }
}
