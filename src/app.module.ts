import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './people/entities/person.entity';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { StudentEntity } from './student/entities/student.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'project1',
      entities: [PersonEntity,StudentEntity],
      synchronize: true,
    }),
    PeopleModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

