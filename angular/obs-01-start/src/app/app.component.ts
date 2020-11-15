import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveService } from './active.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isActive: boolean;
  subscription: Subscription;

  constructor(
    private activeService: ActiveService
  ) {}

  ngOnInit() {
    this.subscription = this.activeService.active.subscribe(
      (isActive) => {
        this.isActive = isActive;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
