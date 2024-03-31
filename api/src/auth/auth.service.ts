/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LogInDto, SignUpDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
  }

  async createAccessToken(user) {
    const payload = { sub: user.userId, username: user.username }
    return await this.jwtService.signAsync(payload)
    }
  
  
  async signUp(signUpDto: SignUpDto) {
      console.log('SIGN UP DTO: ', signUpDto);
    // return signUpDto
//----Check if Username Already Exists-----
    const usernameExists = (await this.userService.findUserByUsername(signUpDto.username)).length > 0
    console.log('USER: ', usernameExists)




    //-----Check if Email Already Exists-----
    const emailExists = (await this.userService.findUserByEmail(signUpDto.email)).length > 0
    console.log('EMAIL: ', emailExists)



    if (usernameExists) {
      throw new BadRequestException('username already exists')
    }

    if (emailExists) {
      throw new BadRequestException('email already exists')
    }




    

//----Hash Password--------
    const hashedPassword = await this.hashPassword(signUpDto.password)
    console.log("HASHED PASSWORD", hashedPassword)
    signUpDto.password = hashedPassword

//-----Add User to the User Table----
    this.userService.createUser(signUpDto)
    // return "fake token"
    const user = await this.userService.createUser(signUpDto)
    console.log("USER: ", user)
    return await this.createAccessToken(user)
  }

  async logIn(logInDto: LogInDto) {
    console.log(' LOG IN DTO', logInDto)
    return 'fake_dto'
  }
}
