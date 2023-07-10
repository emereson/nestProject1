import { IsString, IsDate } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  nom_per: string;

  @IsString()
  pat_per: string;

  @IsString()
  mat_per: string;

  @IsString()
  nro_doc: string;

  @IsDate()
  fch_nac: string;

  @IsString()
  img_per: string;
}
