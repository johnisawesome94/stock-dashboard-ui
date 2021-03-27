import { OverlayContainer } from "@angular/cdk/overlay";
import { ChangeDetectorRef, Component, HostBinding } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddEditStockComponent } from "./main/add-edit-stock/add-edit-stock.component";
import { NewStock } from "./main/add-edit-stock/new-stock";
import { DarkMode } from "./main/dark-mode/dark-mode";
import { DarkModeService } from "./main/dark-mode/dark-mode.service";
import { Stock } from "./main/stock-list/stock";
import { StockQuery } from "./main/stock-query";
import { StockService } from "./main/stock.service";
import { finalize } from "rxjs/operators";
import { fromEvent } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @HostBinding("class") className = "";

  private readonly darkClassName: string = "darkMode";
  public stocks: Stock[] = [];
  public darkMode: DarkMode = { darkMode: true };
  public showChart: boolean = false;

  constructor(
    private dialog: MatDialog,
    private iconRegistry: MatIconRegistry,
    private overlay: OverlayContainer,
    private stockService: StockService,
    private darkModeService: DarkModeService,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.iconRegistry.registerFontClassAlias("fontawesome", "fa");
    this.getStocks();
    this.getDarkMode();

    fromEvent(window, "resize").subscribe(() => {
      this.redrawChart();
    });
  }

  public openAddEditStockDialog(isAdd: boolean = true, stock?: NewStock) {
    this.dialog
      .open(AddEditStockComponent, {
        data: { isAdd: isAdd, stock: stock },
        width: "600px"
      })
      .afterClosed()
      .subscribe(result => {
        if (result === "success") {
          this.getStocks();
        }
      });
  }

  public darkModeToggle(event: MatSlideToggleChange) {
    this.darkMode = { darkMode: event.checked };
    this.darkModeService.editDarkMode(this.darkMode).subscribe(
      () => {
        console.log("successfully updated dark mode");
      },
      error => {
        console.log("failed to edit dark mode");
        console.log(error);
      }
    );

    this.className = this.darkMode.darkMode ? this.darkClassName : "";
    this.redrawChart();
    if (this.darkMode.darkMode) {
      this.overlay.getContainerElement().classList.add(this.darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(this.darkClassName);
    }
  }

  public getStocks(stockQuery?: StockQuery) {
    this.stockService.getStocks(stockQuery).subscribe(
      (stocks: Stock[]) => {
        console.log("successfully got stocks");
        this.stocks = stocks;
        console.log(this.stocks);
      },
      error => {
        console.log(error);
        this.openSnackBar(error);
      }
    );
  }

  public getDarkMode() {
    this.darkModeService
      .getDarkMode()
      .pipe(
        finalize(() => {
          this.redrawChart();
        })
      )
      .subscribe(
        (darkMode: DarkMode) => {
          console.log("successfully edited dark mode");
          this.darkMode = darkMode;
          this.className = this.darkMode.darkMode ? this.darkClassName : "";
          if (this.darkMode.darkMode) {
            this.overlay
              .getContainerElement()
              .classList.add(this.darkClassName);
          } else {
            this.overlay
              .getContainerElement()
              .classList.remove(this.darkClassName);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  public openSnackBar(error) {
    const message: string = error.error.message
      ? error.error.message
      : error.message;
    this._snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: "top",
      panelClass: "error-snackbar"
    });
  }

  public redrawChart(): void {
    this.showChart = false;
    this.cd.detectChanges();
    setTimeout(() => (this.showChart = true), 500);
  }
}
