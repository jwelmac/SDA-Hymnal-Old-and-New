import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the UCFirst pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'ucfirst'
})
@Injectable()
export class UCFirst {
  /*
  Takes a value and makes the first letter uppercase
 */
  transform(value, args) {
    value = value + ''; // make sure it's a string
    return value.replace(/\w\S*/g,
        txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
}
