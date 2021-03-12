import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { AddStockComponent } from "./add-stock.component";

@NgModule({
  imports: [MatButtonModule, MatDialogModule],
  declarations: [AddStockComponent]
})
export class AddStockModule {}
