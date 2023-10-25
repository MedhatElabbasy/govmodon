import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryResolver } from './components/users/country.resolver';
import { UserResolver } from './components/users/user.resolver';
import { UsersComponent } from './components/users/users.component';
import { UsersRoutes } from './routes/users-routes.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: UsersRoutes.users,
    pathMatch: 'full',
  },

  {
    path: UsersRoutes.users,
    component:UsersComponent,
    resolve: {
      initdata: UserResolver,
      codes:CountryResolver
    },
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
