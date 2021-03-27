import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { StockChartComponent } from "./stock-chart.component";
import { MatSelectModule } from "@angular/material/select";
import {
  DateTimeService,
  LegendService,
  TooltipService,
  StockChartAllModule,
  DataLabelService,
  CandleSeriesService,
  CrosshairService,
  LineSeriesService,
  SplineSeriesService,
  StepLineSeriesService,
  CategoryService,
  ParetoSeriesService,
  ColumnSeriesService,
  SplineAreaSeriesService,
  MultiColoredLineSeriesService,
  HiloSeriesService,
  ChartAllModule,
  TrendlinesService,
  ChartModule,
  RangeTooltipService
} from "@syncfusion/ej2-angular-charts";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    StockChartAllModule,
    ChartAllModule,
    ChartModule
  ],
  declarations: [StockChartComponent],
  exports: [StockChartComponent],
  providers: [
    DateTimeService,
    LegendService,
    TooltipService,
    DataLabelService,
    CandleSeriesService,
    CrosshairService,
    LineSeriesService,
    SplineSeriesService,
    StepLineSeriesService,
    CategoryService,
    ParetoSeriesService,
    ColumnSeriesService,
    SplineAreaSeriesService,
    MultiColoredLineSeriesService,
    HiloSeriesService,
    TrendlinesService,
    RangeTooltipService
  ]
})
export class StockChartModule {}
