import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StockListComponent } from "./stock-list.component";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [StockListComponent],
  exports: [StockListComponent]
})
export class StockListModule {}
