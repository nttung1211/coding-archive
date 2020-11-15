import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFound } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { canDeactivateGuard } from "./servers/edit-server/can-deactivated-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },

  { 
    path: 'users', 
    component: UsersComponent,
    children: [
      { 
        path: ':id/:name', 
        component: UserComponent 
      }
    ]
  },

  {
    path: 'servers',
    canActivateChild: [
      AuthGuard
    ],
    // canActivate: [
    //   AuthGuard
    // ],
    component: ServersComponent,
    children: [
      { 
        path: ':id', 
        component: ServerComponent, 
        resolve: { server: ServerResolver } 
      },
      { 
        path: ':id/edit', 
        component: EditServerComponent, 
        canDeactivate: [canDeactivateGuard] 
      }
    ]
  },

  // { path: 'not-found', component: PageNotFound },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'page not found!' } },
  
  { path: '**', redirectTo: 'not-found' } // Route will look up for a path from top to bottom, then when we put this wildcard at the bottom most any links that does not match upper paths will go to it.
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}