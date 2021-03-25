import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddEditStockModule } from "./main/add-edit-stock/add-edit-stock.module";
import { StockListModule } from "./main/stock-list/stock-list.module";
import { AppComponent } from "./app.component";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ErrorStateMatcher } from "@angular/material/core";
import { MyErrorStateMatcher } from "./error-state-matcher/error-state-matcher";
import { HttpClientModule } from "@angular/common/http";
import { StockService } from "./main/stock.service";
import { DarkModeService } from "./main/dark-mode/dark-mode.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StockChartModule } from "@syncfusion/ej2-angular-charts";

@NgModule({
  imports: [
    AddEditStockModule,
    StockListModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    StockChartModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: MyErrorStateMatcher },
    StockService,
    DarkModeService
  ]
})
export class AppModule {}
