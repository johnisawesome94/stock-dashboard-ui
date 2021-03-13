import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-add-stock",
  templateUrl: "./add-stock.component.html",
  styleUrls: ["./add-stock.component.scss"]
})
export class AddStockComponent implements OnInit {
  public form;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      ticker: [""]
      // port: [ this.DEFAULT_REST_PORT ],
      // backupHostGroup: this.formBuilder.group({
      //   backupHost: [ '', [ Validators.required ] ]
      // })
    });
  }
}
