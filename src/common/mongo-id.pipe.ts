import { isMongoId } from 'class-validator';
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isMongoId(value)) {
      throw new BadRequestException(`Val: ${value}, not is a mongoID `);
    }
    return value;
  }
}
