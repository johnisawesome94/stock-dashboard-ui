import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StockService } from "../stock.service";
import { NewStock } from "./new-stock";

@Component({
  selector: "app-add-stock",
  templateUrl: "./add-stock.component.html",
  styleUrls: ["./add-stock.component.scss"]
})
export class AddStockComponent implements OnInit {
  public form;

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService,
    public dialogRef: MatDialogRef<AddStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isAdd: boolean }
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      ticker: ["", { disabled: true, validators: [Validators.required] }],
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
      this.stockService.addStock(newStock).subscribe(
        () => {
          console.log("stock added!");
        },
        error => {
          console.log("failed to add stock");
          console.log(error);
        }
      );
      this.dialogRef.close("success");
    }
  }
}
