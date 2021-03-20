import { OverlayContainer } from "@angular/cdk/overlay";
import { Component, HostBinding, VERSION } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { AddEditStockComponent } from "./main/add-edit-stock/add-edit-stock.component";
import { NewStock } from "./main/add-edit-stock/new-stock";
import { Stock } from "./main/stock-list/stock";
import { StockService } from "./main/stock.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @HostBinding("class") className = "";

  private readonly darkClassName: string = "darkMode";
  public stocks: Stock[] = [];

  constructor(
    private dialog: MatDialog,
    private iconRegistry: MatIconRegistry,
    private overlay: OverlayContainer,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.iconRegistry.registerFontClassAlias("fontawesome", "fa");
    this.getStocks();
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
    this.className = event.checked ? "darkMode" : "";
    if (event.checked) {
      this.overlay.getContainerElement().classList.add(this.darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(this.darkClassName);
    }
  }

  public getStocks() {
    this.stockService.getStocks().subscribe(
      (stocks: Stock[]) => {
        console.log("successfully got stocks");
        this.stocks = stocks;
        console.log(this.stocks)
      },
      error => {
        console.log(error);
      }
    );
  }
}
