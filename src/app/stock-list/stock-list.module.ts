import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StockListComponent } from "./stock-list.component";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  imports: [CommonModule, MatTableModule],
  declarations: [StockListComponent],
  exports: [StockListComponent]
})
export class StockListModule {}
