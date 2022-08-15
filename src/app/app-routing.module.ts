import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path:'', redirectTo:'main',pathMatch:"full"
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'game-play',
    loadChildren: () => import('./pages/game-play/game-play.module').then( m => m.GamePlayPageModule)
  },
  {
    path: 'usersetting',
    loadChildren: () => import('./pages/usersetting/usersetting.module').then( m => m.UsersettingPageModule)
  },
  {
    path: 'rank',
    loadChildren: () => import('./pages/rank/rank.module').then( m => m.RankPageModule)
  },
  {
    path: 'salon',
    loadChildren: () => import('./pages/salon/salon.module').then( m => m.SalonPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
