import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    // const id = +this.activatedRoute.snapshot.params['id']
    // this.server = this.serversService.getServer(id);

    // this.activatedRoute.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // )

    /* using resolve */
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
  }

  onEdit() {
    this.router.navigate(
      ['edit'], 
      { 
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'preserve' // merge if we want to merge with a new one, or keep old one; Presever: if we only want to keep the old one
       }
    );
  }

}
