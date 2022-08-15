import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamePlayPage } from './game-play.page';

const routes: Routes = [
  {
    path: '',
    component: GamePlayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamePlayPageRoutingModule {}
