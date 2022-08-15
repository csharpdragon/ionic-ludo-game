import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PlayerNumPageRoutingModule } from './player-num-routing.module';

import { PlayerNumPage } from './player-num.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayerNumPageRoutingModule,
    ScrollingModule
  ],
  declarations: [PlayerNumPage]
})
export class PlayerNumPageModule {}
