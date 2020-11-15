import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (args[0] && args[1]) {
      return value.filter(el => el[args[1]].includes(args[0]));
    }
    
    return value;
  } 

}
