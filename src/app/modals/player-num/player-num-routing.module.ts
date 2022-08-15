import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerNumPage } from './player-num.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerNumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerNumPageRoutingModule {}
