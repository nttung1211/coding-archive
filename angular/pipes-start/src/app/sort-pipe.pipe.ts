import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPipe',
  pure: false
})
export class SortPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // let props = value.map(el => {
    //   return el[args[0]]
    // }).sort();

    // return props.map(prop => {
    //   let returnValue;
    //   value.forEach(el => {
    //     if (el[args[0]] === prop) {
    //       returnValue = el;
    //     }
    //   });

    //   return returnValue;
    // })

    return value.sort(
      (a, b) => {
        if (a[args[0]] > b[args[0]]) {
          return 1;
        } else {
          return -1;
        }
      }
    );
  }

}
