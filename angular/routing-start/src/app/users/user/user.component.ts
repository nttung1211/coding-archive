import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: { id: number, name: string };

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.user = {
    //   id: this.activatedRoute.snapshot.params['id'],
    //   name: this.activatedRoute.snapshot.params['name']
    // }

    this.activatedRoute.params
    .subscribe(
      (params: Params) => {
        this.user = {
          id : +params['id'],
          name : params['name']
        }
      }
    );
  }

  // onLoadUser() {
  //   this.router.navigate(['/users', 10, 'tung']);
  //   this.user = {
  //     id: this.activatedRoute.snapshot.params['id'],
  //     name: this.activatedRoute.snapshot.params['name']
  //   }
  // }

}
