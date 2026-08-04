import { Injectable } from '@nestjs/common';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationsService {
  applicationList: Application[] = [];

  create(application: Application) {
    const newLength = this.applicationList.push(application);
    const position = newLength - 1;
    return this.applicationList[position];
  }

  findAll() {
    return this.applicationList;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
