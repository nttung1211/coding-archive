import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ActiveService } from '../active.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private activeService: ActiveService
  ) { }

  ngOnInit() {
    /* using an angular observable */
    // this.subscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // );

    /* create own observable */
    const myInterval =  Observable.create(
      observer => {
        let count = 1;
        setInterval(
          () => {
            if (count === 4) {
              observer.complete();
            }
            if (count > 10) {
              observer.error(new Error('Count already reached its maximum!'));
            }
            observer.next(count);
            count = Math.ceil(Math.random() * 11);
          },
          500
        )
      }
    ); 


    this.subscription = myInterval.pipe(
      filter(
        (data: number) => data % 2 === 0
      ),
      map(
        data => {
          return `Round: ${data}`;
        }
      )
    ).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.message);
      },
      () => {
        console.log(`!!! You've seen the devil !!!`);
      }
    );


  }
  
  /* Subject */
  onActivate() {
    this.activeService.active.next(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
