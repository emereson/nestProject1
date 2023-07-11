import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum StudentStatus {
    Active,
    Disable
  }
  
  

@Entity({schema:'siam' , name:'alumno'})
export class StudentEntity {
    @PrimaryGeneratedColumn()
    ide_alu: number;
  
    @Column()
    nom_alu: string;
  
    @Column()
    pat_alu: string;
  
    @Column()
    mat_alu: string;
  
    @Column()
    nro_doc: string;
  
    @Column()
    fch_nac: string;
  
    @Column()
    img_alu: string;

    @Column({ default: StudentStatus.Active })
    status: StudentStatus;
  }
  
