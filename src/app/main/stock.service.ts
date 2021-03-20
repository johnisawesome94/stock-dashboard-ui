import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NewStock } from "./add-edit-stock/new-stock";
import { Stock } from "./stock-list/stock";

@Injectable()
export class StockService {
  private readonly stocksUrl: string =
    "https://stock-dashboard-api.herokuapp.com/stocks";

  constructor(private httpClient: HttpClient) {}

  getStocks(searchTerm?: string): Observable<Stock[]> {
    const url = searchTerm
      ? `${this.stocksUrl}?search=${searchTerm}`
      : this.stocksUrl;
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
}
