import { StatsService } from './stats.service';
import { ElementRef, Injectable, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public tableData: any[];
  public tblOddEvenData: any[];
  public tableDataObservable: BehaviorSubject<any>;
  counterDsply=-1;
  blinktextflagP=false;
  blinktextflagB=false;
  blinktextflagO=false;
  blinktextflagE=false;
  p:any;
  b:any;
  odd:any;
  even:any;
  constructor(private statsService: StatsService) {
    this.tableData = [];
    this.tblOddEvenData = [];
    this.tableDataObservable = new BehaviorSubject<any>(null);
  }

  addOENewCol() {
    if (this.tblOddEvenData.length > 0) {
      this.tblOddEvenData.push([this.statsService.currentOEType]);
      this.statsService.currentOEColNumber++;
      // this.tableservice.counterDsply++;

    } else {
      this.tblOddEvenData.push([this.statsService.currentOEType]);
      this.statsService.currentOEColNumber = 0;
    }
    console.log("oearr:", this.tblOddEvenData)
  }
  
  addOENewRow() {
    if (this.tblOddEvenData.length > 0) {
      this.tblOddEvenData[this.statsService.currentOEColNumber].push(
        this.statsService.currentOEType
      );
    }
    // this.statsService.recalculateStats(
    //   true,
    //   this.statsService.currentOEType,
    //   this.tableData
    // );
  }

  addNewCol() {
    if (this.tableData.length > 0) {
      this.tableData.push([this.statsService.currentType]);
      let type = this.tableData[this.statsService.currentColNumber].length % 2;

      clearInterval(this.odd);
      clearInterval(this.even);
      if(type==0){
        this.blinktextflagO=false;
        this.blinktextflagE=false;
        this.even =setInterval(() =>{this.blinktextflagE=!this.blinktextflagE}, 500);
      }else{
        this.blinktextflagE=false;
        this.blinktextflagO=false;
        this.odd=setInterval(() =>{this.blinktextflagO=!this.blinktextflagO}, 500); 
      }

      if (
        type === this.statsService.currentOEType &&
        this.tblOddEvenData.length > 0
      ) {
        this.addOENewRow();
      } else {
        this.statsService.currentOEType = type;
        this.addOENewCol();
      }
      this.statsService.currentColNumber++;
      
      // if(type==this.p){
      //   this.tableservice.blinktextflagB=false;
      //   this.tableservice.blinktextflagP=false;
      //   this.tableservice.p =setInterval(() =>{this.tableservice.blinktextflagP=!this.tableservice.blinktextflagP}, 500);
      // }else{
      //   this.tableservice.blinktextflagP=false;
      //   this.tableservice.blinktextflagB=false;
      //   this.tableservice.b=setInterval(() =>{this.tableservice.blinktextflagB=!this.tableservice.blinktextflagB}, 500); 
      // }
      // this.tableservice.counterDsply++;
      this.statsService.oddOrEvenArr.push('O');
     
    } else {
      this.tableData.push([this.statsService.currentType]);
      this.statsService.currentColNumber = 0;
    }
    this.statsService.recalculateStats(
      true,
      this.statsService.currentType,
      this.tableData
    );
  }

  addNewRow() {
    if (this.tableData.length > 0) {
      this.tableData[this.statsService.currentColNumber].push(
        this.statsService.currentType
      );
    }
    this.statsService.recalculateStats(
      true,
      this.statsService.currentType,
      this.tableData
    );
  }

  deleteLastInput() {
    if (this.tableData.length > 0) {
      if (this.tableData[this.statsService.currentColNumber].length === 1) {
        this.tableData.pop();
        this.statsService.currentColNumber--;

        this.statsService.oddOrEvenArr.pop();
        this.statsService.recalculateStats(
          false,
          this.statsService.currentType,
          this.tableData
        );
        this.statsService.revertType();
      } else {
        this.tableData[this.statsService.currentColNumber].pop();
        this.statsService.recalculateStats(
          false,
          this.statsService.currentType,
          this.tableData
        );
      }
    }
  }

  clearAll() {
    clearInterval(this.odd);
    clearInterval(this.even);

    clearInterval(this.p);
    clearInterval(this.b);
    this.blinktextflagO=false;
    this.blinktextflagE=false;
    this.blinktextflagP=false;
    this.blinktextflagB=false;

    this.statsService.currentColNumber = null;
    this.statsService.currentType = null;
    this.statsService.resetAllCounts();
    this.tableData = [];
    this.statsService.currentOEColNumber = null;
    this.statsService.currentOEType = null;
    this.tblOddEvenData = [];
    this.tableDataObservable.next(null);

  }
}
