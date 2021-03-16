import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NewStock } from "./add-stock/new-stock";
import { Stock } from "./stock-list/stock";

@Injectable()
export class StockService {
  private readonly stocksUrl: string =
    "https://stock-dashboard-api.herokuapp.com/stocks";

  constructor(private httpClient: HttpClient) {}

  getStocks(): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(this.stocksUrl);
  }

  addStock(stock: NewStock): any {
    return this.httpClient.post(this.stocksUrl, stock);
  }

  editStock(stockId: number, stock: NewStock): any {
    return this.httpClient.put(`${this.stocksUrl}/${stockId}`, stock);
  }

  deleteStock(stockId: number): any {
    return this.httpClient.delete(`${this.stocksUrl}/${stockId}`);
  }
}
