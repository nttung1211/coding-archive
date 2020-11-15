import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: any) {
    // let reversedValue = '';
    // for (let i = value.length - 1; i >= 0; i--) {
    //   reversedValue += value[i];
    // }

    // return reversedValue;
    return value.split('').reverse().join('');
  }
}