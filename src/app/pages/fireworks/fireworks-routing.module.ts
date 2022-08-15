import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FireworksPage } from './fireworks.page';

const routes: Routes = [
  {
    path: '',
    component: FireworksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FireworksPageRoutingModule {}
