import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GamePlayPageRoutingModule } from './game-play-routing.module';
import { InViewportModule } from 'ng-in-viewport';
import { GamePlayPage } from './game-play.page';
// import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePlayPageRoutingModule,
    ScrollingModule,
    InViewportModule,
    // NativeAudio
  ],
  declarations: [GamePlayPage]
})
export class GamePlayPageModule {}
