import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  Res,
  UseInterceptors,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/firebase.utils';
import { PersonStatus } from './entities/person.entity';
import { async } from 'rxjs';

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
async findAll() {
  const people = await this.peopleService.findAll();

  for (const person of people) {
    const imgRef = ref(storage, person.img_per);
    const url = await getDownloadURL(imgRef);
    person.img_per = url;
  }

  return people;
}

  

  @Get(':id')
  async findOne(@Res() res:any,@Param('id') id: number) {
    const person = await this.peopleService.findOne(+id);
    if (person.met_dat) {
      const imgRef = ref(storage, person.met_dat.img_per);
      const url = await getDownloadURL(imgRef);      
      person.met_dat.img_per = url;
      return res.status(200).json(person.met_dat)
    }
    throw new NotFoundException(person.mes_age)
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('img_per'))
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const imgRef = ref(
        storage,
        `personImg/${Date.now()}-${file.originalname}`,
      );
      const imgUploaded = await uploadBytes(imgRef, file.buffer);
      updatePersonDto.img_per = imgUploaded.metadata.fullPath;
    }

  
    return this.peopleService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.update(+id, { status: PersonStatus.Disable });
  }
  
}
 