import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity, PersonStatus } from './entities/person.entity';
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
    return this.personEntity.find({ where: { status: PersonStatus.Active } });
  }

  async findOne(id: number) {
    const person = await this.personEntity.findOne({where:{ide_per:id,status:PersonStatus.Active}});
    let res= {mes_age:"usuario no encontrado",sta_tus:false,met_dat:null};
    if (person) {
      res.mes_age="Usuario encontrado";
      res.sta_tus=true;
      res.met_dat=person;
    }
    return res;
    
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.personEntity.findOneById(id);
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    const updatedPerson = Object.assign(person, updatePersonDto);
    return this.personEntity.save(updatedPerson);
  }

  async remove(id: number) {
    const person = await this.personEntity.findOneById(id);
    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
  
    person.status = PersonStatus.Disable;
    return this.personEntity.save(person);
  }
  
}
