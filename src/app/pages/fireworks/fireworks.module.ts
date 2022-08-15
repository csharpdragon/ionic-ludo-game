import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FireworksPageRoutingModule } from './fireworks-routing.module';
import { InViewportModule } from 'ng-in-viewport';
import { FireworksPage } from './fireworks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FireworksPageRoutingModule,
    InViewportModule
  ],
  declarations: [FireworksPage]
})
export class FireworksPageModule {}
