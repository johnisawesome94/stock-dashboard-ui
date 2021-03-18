import { SelectionModel } from "@angular/cdk/collections";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { finalize } from "rxjs/operators";
import { StockService } from "../stock.service";
import { Stock } from "./stock";

@Component({
  selector: "app-stock-list",
  templateUrl: "./stock-list.component.html",
  styleUrls: ["./stock-list.component.scss"]
})
export class StockListComponent implements OnInit {
  @Input() public set stocks(stocks) {
    this._stocks = stocks;
    this.dataSource = this.stocks;
    this.selection = new SelectionModel<Stock[]>(false, []);
  }

  public get stocks() {
    return this._stocks;
  }

  @Output() public updateStockList: EventEmitter<any> = new EventEmitter();
  @Output() public editStock: EventEmitter<any> = new EventEmitter();

  public dataSource;
  public selection;
  public displayedColumns: string[] = ["ticker", "avgPrice", "numberShares"];

  private _stocks: Stock[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit() {}

  public onEditStock() {
    this.editStock.emit(this.selection.selected[0]);
  }

  public deleteStock() {
    this.stockService
      .deleteStock(this.selection.selected[0].id)
      .pipe(
        finalize(() => {
          this.updateStockList.emit();
        })
      )
      .subscribe(
        () => {
          console.log("successfully deleted stock");
        },
        error => {
          console.log("failed to delete stock");
          console.log(error);
        }
      );
  }

  public refresh() {
    this.updateStockList.emit();
  }
}
