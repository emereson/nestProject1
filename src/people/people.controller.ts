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

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img_per'))
  async create(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFile() img_per: Express.Multer.File,
  ) {    
    if (img_per) {
      const imgRef = ref(
        storage,
        `personImg/${Date.now()}-${img_per.originalname}`,
      );
      await uploadBytes(imgRef, img_per.buffer);
      //const imgRef = ref(storage, person.img_per);    
      createPersonDto.img_per = await getDownloadURL(imgRef);
    }

    return this.peopleService.create(createPersonDto);
  }


  @Get()
async findAll() {
  return this.peopleService.findAll();  
}

  

  @Get(':id')
  async findOne(@Res() res:any,@Param('id') id: number) {
    const person = await this.peopleService.findOne(+id);
    if (person.met_dat) {
      return res.status(200).json(person.met_dat)
    }
    throw new NotFoundException(person.mes_age)
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('img_per'))
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
    @UploadedFile() img_per: Express.Multer.File,
  ) {
    if (img_per) {
      const imgRef = ref(
        storage,
        `personImg/${Date.now()}-${img_per.originalname}`,
      );
      await uploadBytes(imgRef, img_per.buffer);
      //const imgRef = ref(storage, person.img_per);    
      updatePersonDto.img_per = await getDownloadURL(imgRef);
    }
    return this.peopleService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.update(+id, { status: PersonStatus.Disable });
  }
  
}
 