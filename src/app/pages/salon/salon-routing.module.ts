import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalonPage } from './salon.page';

const routes: Routes = [
  {
    path: '',
    component: SalonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalonPageRoutingModule {}
