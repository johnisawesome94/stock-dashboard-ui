import { OverlayContainer } from "@angular/cdk/overlay";
import { Component, HostBinding, VERSION } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIconRegistry } from "@angular/material/icon";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { AddStockComponent } from "./add-stock/add-stock.component";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @HostBinding("class") className = "";

  private readonly darkClassName: string = "darkMode";

  constructor(
    private dialog: MatDialog,
    private iconRegistry: MatIconRegistry,
    private overlay: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.iconRegistry.registerFontClassAlias("fontawesome", "fa");
  }

  public openAddStock() {
    this.dialog.open(AddStockComponent, {
      height: "400px",
      width: "600px"
    });
  }

  public darkModeToggle(event: MatSlideToggleChange) {
    this.className = event.checked ? "darkMode" : "";
    if (event.checked) {
      this.overlay.getContainerElement().classList.add(this.darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(this.darkClassName);
    }
  }
}
