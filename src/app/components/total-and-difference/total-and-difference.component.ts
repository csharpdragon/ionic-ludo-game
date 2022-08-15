import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PresentationElement } from '../../services/stats.service';
import { environment } from '../../../environments/environment';
import { StatsPresentationCalculationService } from 'src/app/services/stats-presentation-calculation.service';
import { TableService } from 'src/app/services/table.service';
@Component({
  selector: 'app-total-and-difference',
  templateUrl: './total-and-difference.component.html',
  styleUrls: ['./total-and-difference.component.scss'],
})
export class TotalAndDifferenceComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input() presentation!: { [key: string]: PresentationElement[] };

  cleanPresentation!: { [key: string]: PresentationElement[] };

  percentages = environment.percentages;

  tableDataSub;
  redStreak = [];
  blueStreak = [];
  oddStreak = [];
  evenStreak = [];
  p_c=localStorage.getItem("p_c")
  b_c=localStorage.getItem("b_c")

  constructor(private statsHandler: StatsPresentationCalculationService,public tableservice:TableService) {
    this.tableDataSub =
      this.statsHandler.tableService.tableDataObservable.subscribe((res) => {
        const data = (res || []).slice();
        const oddEvenData = (tableservice.tblOddEvenData || []).slice();
        oddEvenData.pop()
      
        data.pop();
        const oddData = oddEvenData.filter((arr) => arr[0] === 1);
        this.oddStreak[1] =
          oddData.filter((arr) => arr.length === 1).length || '';
        this.oddStreak[2] =
          oddData.filter((arr) => arr.length === 2).length || '';
        this.oddStreak[3] =
          oddData.filter((arr) => arr.length === 3).length || '';
        this.oddStreak[4] =
          oddData.filter((arr) => arr.length === 4).length || '';
        this.oddStreak[5] =
          oddData.filter((arr) => arr.length > 4).length || '';

        const evenData = oddEvenData.filter((arr) => arr[0] === 0);
        this.evenStreak[1] =
          evenData.filter((arr) => arr.length === 1).length || '';
        this.evenStreak[2] =
          evenData.filter((arr) => arr.length === 2).length || '';
        this.evenStreak[3] =
          evenData.filter((arr) => arr.length === 3).length || '';
        this.evenStreak[4] =
          evenData.filter((arr) => arr.length === 4).length || '';
        this.evenStreak[5] =
          evenData.filter((arr) => arr.length > 4).length || '';
  
        const redData = data.filter((arr) => arr[0] === localStorage.getItem("p"));
        this.redStreak[1] =
          redData.filter((arr) => arr.length === 1).length || '';
        this.redStreak[2] =
          redData.filter((arr) => arr.length === 2).length || '';
        this.redStreak[3] =
          redData.filter((arr) => arr.length === 3).length || '';
        this.redStreak[4] =
          redData.filter((arr) => arr.length === 4).length || '';
        this.redStreak[5] =
          redData.filter((arr) => arr.length > 4).length || '';
        
          const blueData = data.filter((arr) => arr[0] === localStorage.getItem("b"));
        this.blueStreak[1] =
          blueData.filter((arr) => arr.length === 1).length || '';
        this.blueStreak[2] =
          blueData.filter((arr) => arr.length === 2).length || '';
        this.blueStreak[3] =
          blueData.filter((arr) => arr.length === 3).length || '';
        this.blueStreak[4] =
          blueData.filter((arr) => arr.length === 4).length || '';
        this.blueStreak[5] =
          blueData.filter((arr) => arr.length > 4).length || '';
      });
  }

  ngOnInit() {
    this.clearPresentation();
    console.log(document.getElementById("blink"))
  }

  ngOnDestroy(): void {
    this.tableDataSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.presentation) {
      this.clearPresentation();
    }
  }

  calculatePercentageDiff(percentage: string): number {
    if (!this.cleanPresentation) {
      return 0;
    }

    let diff;
    switch (percentage) {
      case '90':
        diff = Math.round(
          (this.cleanPresentation['100'].length /
            this.cleanPresentation['90'].length) *
            100
        );
        break;
      case '80':
        diff = Math.round(
          (this.cleanPresentation['90'].length /
            this.cleanPresentation['80'].length) *
            100
        );
        break;
      case '70':
        diff = Math.round(
          (this.cleanPresentation['80'].length /
            this.cleanPresentation['70'].length) *
            100
        );
        break;
      case '60':
        diff = Math.round(
          (this.cleanPresentation['70'].length /
            this.cleanPresentation['60'].length) *
            100
        );
        break;
      case '50':
        diff = Math.round(
          (this.cleanPresentation['50'].length /
            this.cleanPresentation['60'].length) *
            100
        );
        break;
      default:
        diff = 0;
        break;
    }

    return isNaN(diff) ? 0 : diff;
  }

  private clearPresentation(): void {
    if (!this.presentation) {
      return;
    }

    this.cleanPresentation = Object.assign({}, this.presentation);

    for (const percent of this.percentages) {
      this.cleanPresentation[percent] = this.cleanPresentation[percent].filter(
        (el: PresentationElement, index: number) => {
          if (index >= 9) {
            return !!el.elm;
          }

          return false;
        }
      );
    }
  }
}
