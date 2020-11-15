import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: 'server.component.html',
  styles: [`
  .online {
    font-weight: bold;
  }
  `]
})
export class ServerComponent {
  serverID: number = 10;
  serverStatus: string;

  constructor() {
    this.serverStatus = Math.random() > .5 ? 'online' : 'offline';
  }

  getStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === 'online' ? '#2d2' : 'red';
  }
}