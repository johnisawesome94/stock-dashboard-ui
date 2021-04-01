import { SelectionModel } from "@angular/cdk/collections";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize
} from "rxjs/operators";
import { StockQuery } from "../stock-query";
import { StockService } from "../stock.service";
import { Stock } from "./stock";

@Component({
  selector: "app-stock-list",
  templateUrl: "./stock-list.component.html",
  styleUrls: ["./stock-list.component.scss"]
})
export class StockListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  @Input() public set stocks(stocks) {
    this._stocks = stocks;
    this.dataSource = this.stocks;
    this.dataSource.sort = this.sort;

    this.selection = new SelectionModel<Stock[]>(false, []);

    this.selection.changed.subscribe(stock => {
      if (stock.added?.length) {
        console.log(stock.added[0].ticker);
        this.tickerSelected.emit(stock.added[0].ticker);
      } else {
        this.tickerSelected.emit('');
      }
    });
  }

  public get stocks() {
    return this._stocks;
  }

  @Output() public updateStockList: EventEmitter<any> = new EventEmitter();
  @Output() public editStock: EventEmitter<any> = new EventEmitter();
  @Output() public tickerSelected: EventEmitter<any> = new EventEmitter();

  public dataSource;
  public selection;
  // Needs to match key sent from backend
  public displayedColumns: string[] = [
    "ticker",
    "avgPrice",
    "numberShares",
    "open",
    "previousClose"
  ];
  public searchControl: FormControl;
  public stockQuery: StockQuery = {
    search: null,
    sort: { sortDir: null, sortKey: null }
  };

  private _stocks: Stock[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(term => term !== undefined && term !== null)
      )
      .subscribe((term: string) => {
        this.stockQuery.search = term;
        this.updateStockList.emit(this.stockQuery);
      });
  }

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
    this.updateStockList.emit(this.stockQuery);
  }

  public stockSort(event) {
    console.log(event);

    this.stockQuery.sort.sortDir = event.direction;
    this.stockQuery.sort.sortKey = event.active;
    this.updateStockList.emit(this.stockQuery);
  }
}
