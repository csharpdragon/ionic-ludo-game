import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UsersettingPageRoutingModule } from './usersetting-routing.module';
import { UsersettingPage } from './usersetting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({}),
    UsersettingPageRoutingModule,
    ScrollingModule,
    
  ],
  declarations: [UsersettingPage],
  bootstrap: [UsersettingPage],
})
export class UsersettingPageModule {}
