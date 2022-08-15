import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface PresentationElement {
  index: number;
  elm: string | null;
  statsIndex?: number;
}

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  public currentType: string;
  public currentOEType: number;
  public currentColNumber = 0;
  public currentOEColNumber = 0;
  public totalHeadCount = 0;
  public totalTailCount = 0;
  public totalRoundsCount = 0;
  public totalEvenCount = 0;
  public totalOddCount = 0;
  public page2OddCount = 0;
  public page2EvenCount = 0;
  public oddOrEvenObservable: BehaviorSubject<any>;
  public oddOrEvenArr;

  public presentation: { [key: string]: PresentationElement[] } = {
    80: [],
    70: [],
    60: [],
    50: [],
  };
  public oddEven: { [key: string]: PresentationElement[] } = {
    80: [],
    70: [],
    60: [],
    50: [],
  };

  notCountedCounter = 0;
  constructor( 
    ) {
    this.oddOrEvenObservable = new BehaviorSubject(null);
    this.oddOrEvenArr = [];
  }

  revertType() {
    this.currentType = this.currentType === localStorage.getItem("p") ? localStorage.getItem("b") : localStorage.getItem("p");
  }

  recalculateStats(isAdd: boolean, type: string, tableData: any) {
    if (tableData[this.currentColNumber]) {
      this.oddOrEvenObservable.next(tableData[this.currentColNumber].length);
    }
    if (isAdd) {
      if (type === localStorage.getItem("p")) {
        this.totalHeadCount++;
      } else {
        this.totalTailCount++;
      }

      this.totalRoundsCount++;
    } else {
      if (type === localStorage.getItem("p")) {
        this.totalHeadCount--;
      } else {
        this.totalTailCount--;
      }

      this.totalRoundsCount--;
    }
    // this.totalOddCount = 0;
    // this.totalEvenCount = 0;
    // if (this.oddOrEvenArr.length > 0) {
    //   this.oddOrEvenArr.forEach((element) => {
    //     console.log('element', element);
    //     element === 'O' ? this.totalOddCount++ : this.totalEvenCount++;
    //   });
    // } else {
    //   if (isAdd) {
    //     this.totalOddCount++;
    //   }
    // }
    if (tableData.length === 0) {
      this.resetAllCounts();
    }
  }

  calculatePercentage(count: number, totalCount: number): number {
    if (totalCount === 0) {
      return 0;
    } else {
      return Math.round((count / totalCount) * 100);
    }
  }

  resetAllCounts() {
    this.totalHeadCount = 0;
    this.totalTailCount = 0;
    this.totalRoundsCount = 0;
    this.totalEvenCount = 0;
    this.totalOddCount = 0;
    this.page2EvenCount=0;
    this.page2OddCount=0;
    this.oddOrEvenArr = [];
  }

  checkOddOrEven(colSize: number): any {
    return colSize;
  }

  checkPattern(data: any[]) {
    this.totalEvenCount = 0;
    this.totalOddCount = 0;
    let pattern = '';
    let totalLettersCount = 0;
    data.forEach((innerArr, i) => {
      innerArr.forEach((elm, j) => {
        pattern += elm; //add char to string
        totalLettersCount++;
        if (pattern.length > 2) {
          // if string is longer than two characters check
          if (
            //ending with  PP or BB  and has at least one letter diff like  PBPBPP
            pattern.slice(0, pattern.length - 1).endsWith(elm) &&
            pattern.includes(elm === localStorage.getItem("p") ?localStorage.getItem("b") : localStorage.getItem("p"))
          ) {
            // if last char equal to last - 1 char
            // console.log('Check From First To -1 Before Last');
            this.countOddAndEven(pattern.slice(0, pattern.length - 2));
            pattern = pattern.slice(pattern.length - 2); // pass remaining letters
          } else if (
            !pattern.slice(0, pattern.length - 1).endsWith(elm) &&
            !pattern.slice(0, pattern.length - 2).endsWith(elm)
          ) {
            //not ending with same letter like PPPB
            // console.log('Check From 0 to before last ');
            this.countOddAndEven(pattern.slice(0, pattern.length - 1));
            pattern = pattern.slice(pattern.length - 1);
          } else {
            // console.log('Cant Decide Now');
          }
        } else {
          // console.log('Cant Decide Now');
        }
      });
    });
  }

  countOddAndEven(str) {
    if (str.length % 2 === 0) {
      this.totalEvenCount++;
    } else {
      this.totalOddCount++;
    }
  }
}
