import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
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
    @Inject(MAT_DIALOG_DATA) public data: { isAdd: boolean; stock?: NewStock },
    private _snackBar: MatSnackBar
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
            this.dialogRef.close("success");
          },
          error => {
            this.openSnackBar(error);
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
            this.dialogRef.close("success");
          },
          error => {
            this.openSnackBar(error);
            console.log("failed to edit stock");
            console.log(error);
          }
        );
      }
    }
  }

  public openSnackBar(error) {
    const message: string = error.error.message
      ? error.error.message
      : error.message;
    this._snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: "top",
      panelClass: "error-snackbar"
    });
  }
}
