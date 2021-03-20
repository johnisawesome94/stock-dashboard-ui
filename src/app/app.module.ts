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
    HttpClientModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: MyErrorStateMatcher },
    StockService
  ]
})
export class AppModule {}
