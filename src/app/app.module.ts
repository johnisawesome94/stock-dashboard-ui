import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddStockModule } from "./add-stock/add-stock.module";
import { StockListModule } from "./stock-list/stock-list.module";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ErrorStateMatcher } from "@angular/material/core";
import { MyErrorStateMatcher } from "./error-state-matcher/error-state-matcher";
import { HttpClientModule } from "@angular/common/http";
import { StockService } from "./stock.service";

@NgModule({
  imports: [
    AddStockModule,
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
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: MyErrorStateMatcher },
    StockService
  ]
})
export class AppModule {}
