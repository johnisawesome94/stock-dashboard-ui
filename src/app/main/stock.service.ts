import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NewStock } from "./add-edit-stock/new-stock";
import { PeriodOption } from "./stock-chart/period";
import { ChartStockData } from "./stock-chart/stock-chart-data";
import { Stock } from "./stock-list/stock";
import { StockQuery } from "./stock-query";

@Injectable()
export class StockService {
  private readonly stocksUrl: string =
    "https://stock-dashboard-api.herokuapp.com/stocks";

  constructor(private httpClient: HttpClient) {}

  getStocks(stockQuery?: StockQuery): Observable<Stock[]> {
    if (stockQuery && stockQuery.sort.sortDir) {
      stockQuery.sort.sortDir = stockQuery.sort.sortDir === "asc" ? 1 : -1;
    }

    let url: string = this.stocksUrl;
    if (stockQuery && stockQuery.search && !stockQuery.sort.sortDir) {
      url = url + "?search=" + stockQuery.search;
    } else if (stockQuery && !stockQuery.search && stockQuery.sort.sortDir) {
      url =
        url +
        "?sortDir=" +
        stockQuery.sort.sortDir +
        "&sortKey=" +
        stockQuery.sort.sortKey;
    } else if (stockQuery && stockQuery.search && stockQuery.sort.sortDir) {
      url =
        url +
        "?search=" +
        stockQuery.search +
        "&sortDir=" +
        stockQuery.sort.sortDir +
        "&sortKey=" +
        stockQuery.sort.sortKey;
    }

    return this.httpClient.get<Stock[]>(url);
  }

  addStock(stock: NewStock): any {
    stock.ticker = stock.ticker.toUpperCase();
    return this.httpClient.post(this.stocksUrl, stock);
  }

  editStock(stock: NewStock): any {
    return this.httpClient.put(`${this.stocksUrl}/${stock.id}`, stock);
  }

  deleteStock(stockId: number): any {
    return this.httpClient.delete(`${this.stocksUrl}/${stockId}`);
  }

  getStockChart(
    ticker: string,
    period: PeriodOption
  ): Observable<ChartStockData[]> {
    return this.httpClient.get<ChartStockData[]>(
      `${this.stocksUrl}/chart?ticker=${ticker}&period=${period.value}`
    );
  }
}
