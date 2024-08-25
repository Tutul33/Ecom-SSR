import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'niBoolean'
})
export class NiBooleanPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? "Yes" : "No";
  }

}
