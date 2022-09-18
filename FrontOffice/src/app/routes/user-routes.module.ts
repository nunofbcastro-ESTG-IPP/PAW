import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ClientGuardService } from 'src/app/services/guard/client-guard.service';

import { UserDashboardComponent } from 'src/app/ui/views/user/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    data: { title: 'Dashboard', animation: 'dashboard' },
    canActivate: [ClientGuardService],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class UserRoutesModule {}
