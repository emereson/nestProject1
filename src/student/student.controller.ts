import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'src/utils/firebase.utils';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img_alu'))
  async create(
    @Body() createStudentDto: CreateStudentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const imgRef = ref(
        storage,
        `studentImg/${Date.now()}-${file.originalname}`,
      );
      const imgUploaded = await uploadBytes(imgRef, file.buffer);
      createStudentDto.img_alu = imgUploaded.metadata.fullPath;
    }
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const stundent = await this.studentService.findOne(+id);
    if (stundent) {
      const imgRef = ref(storage, stundent.img_alu);
      const url = await getDownloadURL(imgRef);
      stundent.img_alu = url;
    }
    return stundent;
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
