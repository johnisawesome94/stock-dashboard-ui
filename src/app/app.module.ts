import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddStockModule } from "./add-stock/add-stock.module";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { MaterialModule } from "./material.module";

@NgModule({
  imports: [
    AddStockModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
