/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Name } from './name.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Name)
    private namesRepository: Repository<Name>,
  ) {}
  async addName(firstName: string, lastName: string) {
// take the name and save it into the name table of the postgres database
    // console.log('NAME: ', name);
   await this.namesRepository.save({ first_name: firstName, last_name: lastName })
    return await this.getNames();
  }
  async getNames() {
    //get all names from database
    return await this.namesRepository.find();
    // console.log('NAMES: ', names)
 
  }
}
