/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    const usernameExists = (await this.userService.findUserByUsername(signUpDto.username))?.username
    console.log('USER: ', usernameExists)




    //-----Check if Email Already Exists-----
    const emailExists = (await this.userService.findUserByEmail(signUpDto.email))?.email
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



  async verifyPassword(enteredPassword: string, existingPassword: string) {
    return await bcrypt.compare(enteredPassword, existingPassword)
  }

  async logIn(logInDto: LogInDto) {
    //check that user exists

    const user = await this.userService.findUserByUsername(logInDto.username)
    console.log('USER', user)
    //If user doesn't exist, throw unauthorized error

    //verify that passwords match
    //If the passwords don't match, throw unauthorized error
    if (user) {
      const passwordsMatch = await this.verifyPassword(
        logInDto.password,
        user.password,
      );
      if (!passwordsMatch) {
        throw new UnauthorizedException('incorrect password');
      }
    } else {
      throw new UnauthorizedException('username does not exist');
    }

    return await this.createAccessToken(user);
  }

  async getProfileData(username: string) {
    console.log('USERNAME: ', username);
    const user = await this.userService.findUserByUsername(username);

    //create and return an access token
    // console.log(' LOG IN DTO', logInDto)
    return {
      email: user.email,
      name: user.name,
      username: user.username,
    }
  }
}
