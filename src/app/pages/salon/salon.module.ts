import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SalonPageRoutingModule } from './salon-routing.module';

import { SalonPage } from './salon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalonPageRoutingModule,
    ScrollingModule,
  ],
  declarations: [SalonPage]
})
export class SalonPageModule {}
