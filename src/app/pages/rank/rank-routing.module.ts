import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankPage } from './rank.page';

const routes: Routes = [
  {
    path: '',
    component: RankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankPageRoutingModule {}
