import { StatsService } from "../../services/stats.service";
import { TableService } from "../../services/table.service";
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  Renderer2,
} from "@angular/core";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent {
  currentType: string;
  number_array = [];
  maxJvalue = null;
  @ViewChildren("anchor") anchorList: QueryList<ElementRef>;
  p=localStorage.getItem("p")
  b=localStorage.getItem("b")
  p_c= localStorage.getItem("p_c")
  b_c= localStorage.getItem("b_c")
  constructor(
    public tableService: TableService,
    public statsService: StatsService,
    private renderer: Renderer2
  ) {
    
    this.statsService.oddOrEvenObservable.subscribe((val) => {
      if (val) {
        console.log(this.p)
        console.log(this.b)
        console.log(this.p_c)
        console.log(this.b_c)
        if (this.statsService.currentColNumber >= 0) {
          if (this.statsService.oddOrEvenArr.length > 0) {
            this.statsService.oddOrEvenArr[this.statsService.currentColNumber] =
              val;
          } else {
            this.statsService.oddOrEvenArr.push(val);
          }
          this.statsService.checkPattern(this.tableService.tableData);
        }
      }

      const rows = document.getElementById("rows");

      if (rows) {
        rows.scrollLeft += rows.scrollWidth;
      }
    });
  }

  changeColor(item, j, i) {
    if (this.maxJvalue == null) {
      this.maxJvalue = j;
    }
    if (this.maxJvalue < j) {
      this.maxJvalue = j;
    }

    if (this.maxJvalue < i) {
      this.maxJvalue = i;
    }

    let A = [];
    for (var ind = 0; ind < this.maxJvalue + 1; ind++) {
      A[ind] = [];
      for (var jnd = 0; jnd < this.maxJvalue + 1; jnd++) {
        if (ind < this.tableService.tableData.length) {
          if (jnd < this.tableService.tableData[ind].length) {
            let value = this.tableService.tableData[ind][jnd];
            console.log(this.tableService.tableData[ind][jnd]);
            if (value != undefined) {
              A[ind][jnd] = String(ind) + String(jnd);
            } else A[ind][jnd] = "0";
          } else {
            A[ind][jnd] = "0";
          }
        } else {
          A[ind][jnd] = "0";
        }
      }
    }
    console.log(A);
    let arr = [];
    for (let row of A) for (let e of row) arr.push(e);
    arr = arr.filter(function (val) {
      return val !== "0";
    });
    console.log(arr);
    let oneDindex = String(i) + String(j);
    console.log(this.anchorList);
    let exp = arr.indexOf(oneDindex);
    const elementRef = this.anchorList["_results"].find(
      (item, index) => index === exp
    );
    console.log(elementRef.nativeElement.style.backgroundColor);
    if (
      elementRef.nativeElement.style.backgroundColor == "" ||
      elementRef.nativeElement.style.background == "var(--ion-color-primary)" ||
      elementRef.nativeElement.style.background == "var(--ion-color-danger)"
    ) {
      this.renderer.setStyle(elementRef.nativeElement, "background", "yellow");
    } else if (elementRef.nativeElement.style.backgroundColor == "yellow") {
      this.renderer.setStyle(elementRef.nativeElement, "background", "green");
    } else if (elementRef.nativeElement.style.backgroundColor == "green") {
      this.renderer.setStyle(elementRef.nativeElement, "background", "orange");
    } else if (elementRef.nativeElement.style.backgroundColor == "orange") {
      if (item == localStorage.getItem("p")) {
        this.renderer.setStyle(
          elementRef.nativeElement,
          "background",
          "var(--ion-color-primary)"
        );
      } else {
        this.renderer.setStyle(
          elementRef.nativeElement,
          "background",
          "var(--ion-color-danger)"
        );
      }
    }
  }
}
