import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StudentService {
constructor(
  @InjectRepository(StudentEntity)
  private studentEntity: Repository<StudentEntity>
) {}

 async  create(createStudentDto: CreateStudentDto) {
    return this.studentEntity.save(
      await this.studentEntity.create(createStudentDto)
    )
  }

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return this.studentEntity.findOneById(id)
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
