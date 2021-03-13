import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { AddStockComponent } from "./add-stock.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  declarations: [AddStockComponent]
})
export class AddStockModule {}
