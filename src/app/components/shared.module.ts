import { AnotherTablePresentationComponent } from './another-table-presentation/another-table-presentation.component';
import { TableComponent } from './table/table.component';
import { StatsComponent } from './stats/stats.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {TotalAndDifferenceComponent} from './total-and-difference/total-and-difference.component';
@NgModule({
  declarations: [
    StatsComponent,
    TableComponent,
    AnotherTablePresentationComponent,
    TotalAndDifferenceComponent
  ],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [StatsComponent, TableComponent, AnotherTablePresentationComponent, TotalAndDifferenceComponent],
})
export class SharedModule {}
