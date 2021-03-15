import { Component, Input, OnInit } from "@angular/core";
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
  }

  public get stocks() {
    return this._stocks;
  }

  public dataSource;
  public displayedColumns: string[] = ["ticker", "avgPrice", "numberShares"];

  private _stocks: Stock[] = [];

  constructor() {}

  ngOnInit() {}
}
