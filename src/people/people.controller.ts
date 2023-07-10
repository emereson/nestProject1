import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/firebase.utils';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img_per'))
  async create(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const imgRef = ref(
        storage,
        `personImg/${Date.now()}-${file.originalname}`,
      );
      const imgUploaded = await uploadBytes(imgRef, file.buffer);
      createPersonDto.img_per = imgUploaded.metadata.fullPath;
    }

    return this.peopleService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const person = await this.peopleService.findOne(+id);

    if (person) {
      const imgRef = ref(storage, person[id].img_per);
      const url = await getDownloadURL(imgRef);
      console.log(person[0].img_per);

      person[id].img_per = url;
    }

    return person;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
