import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PersonEntity)
    private personEntity: Repository<PersonEntity>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    return this.personEntity.save(
      await this.personEntity.create(createPersonDto),
    );
  }

  findAll() {
    return `This action returns all people`;
  }

  async findOne(id: number) {
    return this.personEntity.findOne(id);
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
