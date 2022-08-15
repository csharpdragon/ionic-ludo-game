import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StatsPresentationCalculationService} from '../../services/stats-presentation-calculation.service';
import { TableService } from 'src/app/services/table.service';
@Component({
  selector: 'app-another-table-presentation',
  templateUrl: './another-table-presentation.component.html',
  styleUrls: ['./another-table-presentation.component.scss'],
})
export class AnotherTablePresentationComponent implements OnInit {
  @Output() presentationUpdated: EventEmitter<void> = new EventEmitter<void>();
  p=localStorage.getItem("p");
  b=localStorage.getItem("b");
  p_c=localStorage.getItem("p_c");
  b_c=localStorage.getItem("b_c");

  constructor(public statsHandler: StatsPresentationCalculationService, public tableService:TableService) {
    this.p=localStorage.getItem("p");
    this.b=localStorage.getItem("b");
  }

  ngOnInit() {
    this.statsHandler.init();
  }
}
