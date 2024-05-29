import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FormPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return new metadata.metatype(value);
  }
}
