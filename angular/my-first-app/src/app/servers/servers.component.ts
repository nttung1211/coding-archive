import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer = true;
  pri = 'btn btn-primary';
  serverStatus = 'No server created.';
  serverName = '';
  keyStroke = '';
  serverCreated = false;
  servers = ['server test 1', 'server test 2'];
  isHidden = true;
  count = [];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = false;
    }, 2000);
  }

  onClickHandler() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverStatus = 'A server is created with name: ' + this.serverName;
  }

  updateServerName(event: Event)  {
    this.serverName = (event.target as HTMLInputElement).value;
  }

  displayDetail() {

    if (!this.isHidden) {
      this.count.push(new Date());
    }

    this.isHidden = false;
  }
}
