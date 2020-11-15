import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    }
  ];

  filterStatus = '';
  asyncStatus = new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        resolve('Online');
      }, 2000);
    }
  )

  onAdd() {
    this.servers.push(
      {
        instanceType: 'small',
        name: 'Testing Environment Server',
        status: 'stable',
        started: new Date(15, 1, 2017)
      }
    );
  }
  // updating data of the component doesn't trigger pipe to recalculate
  // changing the argument pass to the pipe trigger that.
  // we can force pipe recalculate whenever data updated by add pure: fasle to the pipe decorator


  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }
}

