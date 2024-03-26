/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }

  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
  }
  
  async signUp(signUpDto) {
      console.log('SIGN UP DTO: ', signUpDto);
    // return signUpDto
//----Check if Username Already Exists-----
    


//-----Check if Email Already Exists-----

//----Hash Password--------
    const hashedPassword = await this.hashPassword(signUpDto.password)
    console.log("HASHED PASSWORD", hashedPassword)
    signUpDto.password = hashedPassword

//-----Add User to the User Table----
    this.userService.createUser(signUpDto)
    return "fake token"
  }
}
