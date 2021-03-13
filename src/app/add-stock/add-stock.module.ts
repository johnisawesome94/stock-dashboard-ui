import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { AddStockComponent } from "./add-stock.component";

@NgModule({
  imports: [MatButtonModule, MatDialogModule, MatInputModule],
  declarations: [AddStockComponent]
})
export class AddStockModule {}
