import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutDefaultComponent } from './ui/layouts/layout-default/layout-default.component';

import { HomeRoutesModule } from './routes/home-routes.module';
import { BookRoutesModule } from './routes/book-routes.module';
import { AuthRoutesModule } from './routes/auth-routes.module';
import { UserRoutesModule } from './routes/user-routes.module';
import { PurchaseRoutesModule } from './routes/purchase-routes.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    loadChildren: () => HomeRoutesModule,
  },
  {
    path: 'book',
    component: LayoutDefaultComponent,
    loadChildren: () => BookRoutesModule,
  },
  {
    path: 'auth',
    component: LayoutDefaultComponent,
    loadChildren: () => AuthRoutesModule,
  },
  {
    path: 'user',
    component: LayoutDefaultComponent,
    loadChildren: () => UserRoutesModule,
  },
  {
    path: 'purchase',
    component: LayoutDefaultComponent,
    loadChildren: () => PurchaseRoutesModule,
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
