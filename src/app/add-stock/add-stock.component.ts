import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
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
    public dialogRef: MatDialogRef<AddStockComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      ticker: ["", { validators: [Validators.required] }],
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
      this.dialogRef.close(newStock);
    }
  }
}
