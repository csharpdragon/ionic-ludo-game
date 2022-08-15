import { Injectable } from '@angular/core';
import {TableService} from './table.service';
import {PresentationElement, StatsService} from './stats.service';
import {environment} from '../../environments/environment';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StatsPresentationCalculationService {

  dummyArr = [];
  oddEvenArr = [];
  currentPercentage = 0;
  previousPercentage = 0;
  oddCount = 0;
  evenCount = 0;
  oddEvenArray = [];
  p=localStorage.getItem("p");
  b=localStorage.getItem("b")

  constructor(
    public tableService: TableService,
    public statsService: StatsService
  ) { }

  private static scrollPage2Grid() {
    const page2Grid = document.getElementById('scrollable_grid');

    if (page2Grid) {
      page2Grid.scrollLeft += page2Grid.offsetWidth;
    }
  }

  init(): void {
    this.tableService.tableDataObservable.pipe(take(1)).subscribe((data) => {
      if (data) {
        this.dummyArr = [];
        this.oddEvenArray = [];
        this.currentPercentage = 0;
        this.previousPercentage = 0;
        this.statsService.presentation = {
          70: [],
          60: [],
          50: [],
        };
        this.statsService.oddEven = {
          70: [],
          60: [],
          50: [],
        };
        this.oddCount = 0;
        this.evenCount = 0;
        this.oddEvenArr = data.map(ele => ({ index: ele.length, elm: (ele.length % 2) }));
        this.oddEvenArr.pop();
        data.forEach((arr: any[]) => {
          arr.forEach((element) => {
            this.dummyArr.push(element);
          });
        });
        this.populatingPresentation();
        this.classifyOddEvenArray(this.oddEvenArr)
      }
    });
  }

  private populatingPresentation() {
    if (this.dummyArr.length > 9) {
      this.classifyMainArray(this.dummyArr);
    }
  }

  private classifyOddEvenArray(arr: any[]) {
    let oCount = 0;
    let eCount = 0;
    // this.fillOtherArrays(percentage, tempArr.length, isFirst10);
    let tempArr = [];
    let percentage = 0;
    let removedElm = null;

    arr.forEach((item, index) => {
      let elm = item.elm;
      if (elm === 0) {
        eCount++;
      } else {
        oCount++;
      }

      tempArr.push({ index, elm });

      if (index === 9) {
        //push data for odd even array when squares are lower than 10
        // if squares are 10
        percentage =
          eCount > oCount
            ? (eCount / (eCount + oCount)) * 100
            : (oCount / (eCount + oCount)) * 100;
        this.setOEDataInCorrectRow(tempArr, percentage, true);
        // this.currentPercentage = percentage;
      } else if (index > 9) {
        // if squares are more than 10
        removedElm = tempArr.shift(); //remove first square

        if (removedElm) {
          if (removedElm.elm === 0) {
            eCount--;
          } else {
            oCount--;
          }
        }

        percentage =
          eCount > oCount
            ? (eCount / (eCount + oCount)) * 100
            : (oCount / (eCount + oCount)) * 100;

        // this.currentPercentage = percentage;
        this.setOEDataInCorrectRow(tempArr, percentage, false);
      }
    })
    console.log("sum:", eCount, oCount)
  }

  private setOEDataInCorrectRow(tempArr: any[], percentage: number, isFirst10?: boolean) {
    this.fillOEOtherArrays(percentage, tempArr.length, isFirst10);
    switch (percentage) {
      case 70:
        if (isFirst10) {
          this.statsService.oddEven[70].push(...tempArr);
        } else {
          this.statsService.oddEven[70].push(tempArr[tempArr.length - 1]);
        }
        break;
      case 60:
        if (isFirst10) {
          this.statsService.oddEven[60].push(...tempArr);
        } else {
          this.statsService.oddEven[60].push(tempArr[tempArr.length - 1]);
        }
        break;
      case 50:
        if (isFirst10) {
          this.statsService.oddEven[50].push(...tempArr);
        } else {
          this.statsService.oddEven[50].push(tempArr[tempArr.length - 1]);
        }
        break;
      default:
        break;
    }

    StatsPresentationCalculationService.scrollPage2Grid();
    console.log("presen:", this.statsService.oddEven)
  }

  private fillOEOtherArrays(
    notToPushInto: number,
    emptyCount: number,
    isFirst10: boolean
  ) {
    for (const key in this.statsService.oddEven) {
      if (Number(key) !== notToPushInto) {
        if (isFirst10) {
          for (let index = 0; index < emptyCount; index++) {
            this.statsService.oddEven[key].push({
              index: this.statsService.oddEven[key].length,
              elm: null,
            });
          }
        } else {
          this.statsService.oddEven[key].push({
            index: this.statsService.oddEven[key].length,
            elm: null,
          });
        }
      }
    }
  }

  private classifyMainArray(arr: any[]) {
    let pCount = 0;
    let bCount = 0;
    let percentage = 0;
    const tempArr = [];
    let removedElm = null;
    let UCS = [];
    arr.forEach((elm, index) => {

      if (elm === this.p) {
        pCount++;
      } else {
        bCount++;
      }

      tempArr.push({ index, elm });

      if (index === 9) {
        //push data for odd even array when squares are lower than 10
        this.oddEvenArray.push({ index, elm });
        // if squares are 10
        percentage =
          pCount > bCount
            ? (pCount / (pCount + bCount)) * 100
            : (bCount / (pCount + bCount)) * 100;
        this.setDataInCorrectRow(tempArr, percentage, true);
        this.currentPercentage = percentage;
        UCS.push('U');
      } else if (index > 9) {
        // if squares are more than 10
        removedElm = tempArr.shift(); //remove first square

        if (removedElm) {
          if (removedElm.elm === localStorage.getItem("p")) {
            pCount--;
          } else {
            bCount--;
          }
        }

        percentage =
          pCount > bCount
            ? (pCount / (pCount + bCount)) * 100
            : (bCount / (pCount + bCount)) * 100;
        if (percentage === this.currentPercentage) {
          UCS.push('U');
        } else {
          UCS.push('C');
        }

        this.currentPercentage = percentage;
        this.setDataInCorrectRow(tempArr, percentage, false);

        if (
          (UCS[UCS.length - 1] === 'C' && UCS[UCS.length - 2] === 'U') ||
          (UCS[UCS.length - 1] === 'U' && UCS[UCS.length - 2] === 'C')
        ) {
          this.checkOddOrEven();
          UCS = [];
          this.oddEvenArray.push({ index, elm });
        } else {
          this.oddEvenArray.push({ index, elm });
        }
      } else if (index < 9) {
        this.oddEvenArray.push({ index, elm });
        UCS.push('U');
      }
    });
  }

  private setDataInCorrectRow(tempArr: any[], percentage: number, isFirst10?: boolean) {
    this.fillOtherArrays(percentage, tempArr.length, isFirst10);
    switch (percentage) {
      case 70:
        if (isFirst10) {
          this.statsService.presentation[70].push(...tempArr);
        } else {
          this.statsService.presentation[70].push(tempArr[tempArr.length - 1]);
        }
        break;
      case 60:
        if (isFirst10) {
          this.statsService.presentation[60].push(...tempArr);
        } else {
          this.statsService.presentation[60].push(tempArr[tempArr.length - 1]);
        }
        break;
      case 50:
        if (isFirst10) {
          this.statsService.presentation[50].push(...tempArr);
        } else {
          this.statsService.presentation[50].push(tempArr[tempArr.length - 1]);
        }
        break;
      default:
        break;
    }

    this.setStatsIndex();
    StatsPresentationCalculationService.scrollPage2Grid();
  }

  private setStatsIndex() {
    for (const percent of environment.percentages) {
      let lastNonBlank = 0;

      this.statsService.presentation[percent] = this.statsService.presentation[percent].map((value: PresentationElement, index: number) => {
        if (index < 9) {
          return value;
        }

        const res = {
          ...value,
          statsIndex: value.elm ? lastNonBlank + 1 : undefined
        };

        lastNonBlank = res.statsIndex ? res.statsIndex : lastNonBlank;

        return res;
      });
    }
  }

  private fillOtherArrays(
    notToPushInto: number,
    emptyCount: number,
    isFirst10: boolean
  ) {
    for (const key in this.statsService.presentation) {
      if (Number(key) !== notToPushInto) {
        if (isFirst10) {
          for (let index = 0; index < emptyCount; index++) {
            this.statsService.presentation[key].push({
              index: this.statsService.presentation[key].length,
              elm: null,
            });
          }
        } else {
          this.statsService.presentation[key].push({
            index: this.statsService.presentation[key].length,
            elm: null,
          });
        }
      }
    }
  }

  private checkOddOrEven(percentage?: number, isRepeated?: boolean) {
    if (this.oddEvenArray.length % 2 === 0) {
      this.evenCount++;
    } else {
      this.oddCount++;
    }

    this.oddEvenArray = [];
    //updating percentages
    this.statsService.page2EvenCount = this.evenCount;
    this.statsService.page2OddCount = this.oddCount;
  }
}
