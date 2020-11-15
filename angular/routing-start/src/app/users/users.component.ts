import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    }
  ];

  selectedUser: { id: number, name: string } = {id: 1, name: 'max'};

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  // onLoadUser(user) {
  //   this.router.navigate(['/users', user.id, user.name]);
  //   this.selectedUser = {
  //     id: user.id,
  //     name: user.name
  //   }
  // }
  /* this won't work because whenever we navigate to a component the component will be recreated then the user in the user component will be again null */

   // onLoadUser(user) {
  //   this.router.navigate(['/users', user.id, user.name]);
  // }
  /* this plus the ngoninnit in the user component is enough to work */
}
