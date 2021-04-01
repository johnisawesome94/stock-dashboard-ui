import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { StockService } from "../stock.service";
import { Period, PeriodOption } from "./period";
import { StockChartData } from "./stock-chart-data";
import { SeriesType } from "./stock-series-type";
import { TrendlineType } from "./stock-trendline-types";

@Component({
  selector: "app-stock-chart",
  templateUrl: "./stock-chart.component.html",
  styleUrls: ["./stock-chart.component.scss"]
})
export class StockChartComponent implements OnInit {
  @Input() public theme: string;
  @Input() public set ticker(ticker) {
    this._ticker = ticker;
    if (ticker) {
      this.getData(ticker, this.selectedPeriod);
    }
  }
  public get ticker() {
    return this._ticker;
  }

  public form;

  public primaryXAxis = {
    valueType: "DateTime",
    crosshairTooltip: { enable: true }
  };
  public primaryYAxis = {
    majorTickLines: { color: "transparent", width: 0 },
    crosshairTooltip: { enable: true }
  };

  // TODO: Tooltip didn't work
  public tooltip = {
    enable: true
  };

  public stockChartData;
  public SeriesType = SeriesType;
  public TrendlineType = TrendlineType;

  public seriesType: {
    value: SeriesType;
    displayValue: string;
  }[] = SeriesType.getSeriesTypeSelectOptions();

  public trendlineType: {
    value: TrendlineType;
    displayValue: string;
  }[] = TrendlineType.getTrendlineTypeSelectOptions();

  public periods: PeriodOption[] = Period.getPeriodOptions();
  public selectedPeriod: PeriodOption = this.periods[0];

  private _ticker: string;
  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      seriesType: [this.seriesType[0]],
      trendlineType: [this.trendlineType[0]],
      period: [this.selectedPeriod]
    });

    this.form.get("period").valueChanges.subscribe((value: PeriodOption) => {
      this.selectedPeriod = value;
      this.getData(this.ticker, this.selectedPeriod);
    });
  }

  public getSolidCandles() {
    return (
      SeriesType.getDisplayValue(
        this.form.get("seriesType").value.displayValue
      ) === SeriesType.getDisplayValue(SeriesType.Candle)
    );
  }

  // public onSeriesTypeMenuClick(type: {
  //   value: SeriesType;
  //   displayValue: string;
  // }) {
  //   this.form.get("seriesType").setValue(type);
  // }

  // public onTrendlineTypeMenuClick(type: {
  //   value: TrendlineType;
  //   displayValue: string;
  // }) {
  //   this.form.get("trendlineType").setValue(type);
  // }

  private getData(ticker: string, period: PeriodOption) {
    this.stockService
      .getStockChart(ticker, period)
      .subscribe((stockChartData: StockChartData) => {
        this.stockChartData = stockChartData;
      });
  }
}
