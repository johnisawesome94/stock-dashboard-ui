import { OverlayContainer } from "@angular/cdk/overlay";
import { Component, HostBinding, VERSION } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { AddEditStockComponent } from "./main/add-edit-stock/add-edit-stock.component";
import { NewStock } from "./main/add-edit-stock/new-stock";
import { DarkMode } from "./main/dark-mode/dark-mode";
import { DarkModeService } from "./main/dark-mode/dark-mode.service";
import { Stock } from "./main/stock-list/stock";
import { StockService } from "./main/stock.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @HostBinding("class") className = "";

  private readonly darkClassName: string = "";
  public stocks: Stock[] = [];
  public darkMode: DarkMode = { darkMode: true };

  constructor(
    private dialog: MatDialog,
    private iconRegistry: MatIconRegistry,
    private overlay: OverlayContainer,
    private stockService: StockService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.iconRegistry.registerFontClassAlias("fontawesome", "fa");
    this.getStocks();
    this.getDarkMode();
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

    this.className = this.darkMode.darkMode ? "darkMode" : "";
    if (this.darkMode.darkMode) {
      this.overlay.getContainerElement().classList.add(this.darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(this.darkClassName);
    }
  }

  public getStocks(searchTerm?: string) {
    this.stockService.getStocks(searchTerm).subscribe(
      (stocks: Stock[]) => {
        console.log("successfully got stocks");
        this.stocks = stocks;
        console.log(this.stocks);
      },
      error => {
        console.log(error);
      }
    );
  }

  public getDarkMode() {
    this.darkModeService.getDarkMode().subscribe(
      (darkMode: DarkMode) => {
        console.log("successfully edited dark mode");
        this.darkMode = darkMode;
        this.className = this.darkMode.darkMode ? "darkMode" : "";
        console.log(this.darkMode);
      },
      error => {
        console.log(error);
      }
    );
  }
}
