import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StockService } from "../stock.service";
import { NewStock } from "./new-stock";

@Component({
  selector: "app-add-edit-stock",
  templateUrl: "./add-edit-stock.component.html",
  styleUrls: ["./add-edit-stock.component.scss"]
})
export class AddEditStockComponent implements OnInit {
  public form;

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService,
    public dialogRef: MatDialogRef<AddEditStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isAdd: boolean; stock?: NewStock }
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      ticker: [
        {
          value: this.data.isAdd ? "" : this.data.stock.ticker,
          disabled: !this.data.isAdd
        },
        { validators: [Validators.required] }
      ],
      avgPrice: ["", { validators: [Validators.required] }],
      numberShares: ["", { validators: [Validators.required] }]
    });
  }

  public getInputErrorMessage() {
    return "Input required.";
  }

  public onSubmit(event) {
    if (this.form.valid) {
      const newStock: NewStock = {
        ticker: this.form.get("ticker").value,
        avgPrice: this.form.get("avgPrice").value,
        numberShares: this.form.get("numberShares").value
      };

      if (this.data.isAdd) {
        this.stockService.addStock(newStock).subscribe(
          () => {
            console.log("stock added!");
          },
          error => {
            console.log("failed to add stock");
            console.log(error);
          }
        );
      } else {
        newStock.id = this.data.stock.id;
        console.log(newStock);
        this.stockService.editStock(newStock).subscribe(
          () => {
            console.log("stock edited!");
          },
          error => {
            console.log("failed to edit stock");
            console.log(error);
          }
        );
      }
      this.dialogRef.close("success");
    }
  }
}
