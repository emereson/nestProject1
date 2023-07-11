import { IsDate, IsString } from "class-validator";

export class CreateStudentDto {

    @IsString()
    nom_alu: string;
  
    @IsString()
    pat_alu: string;
  
    @IsString()
    mat_alu: string;
  
    @IsString()
    nro_doc: string;
  
    @IsDate()
    fch_nac: string;
  
    @IsString()
    img_alu: string;
}
