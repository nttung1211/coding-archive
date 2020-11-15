import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number = null, upperCase: boolean = false) {
    let n = limit || 10;
    
    if (upperCase) {
      value = value.toUpperCase();
    }

    return value.length > n ? value.substr(0, n) + '...' : value;
  }
}