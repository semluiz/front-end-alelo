import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { VehicleService } from "./services/vehicle.service";
import { Vehicle } from "./services/vehicle";
import { Component } from "@angular/core";
import { FormBuilder, NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "alelo-front";

  vehicle = {} as Vehicle;

  button: Boolean;

  vehicles: Vehicle[];

  status: [
    { name: "active"; status: true },
    { name: "inactive"; status: false }
  ];

  constructor(
    private vehicleService: VehicleService,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.getVehicles();
  }

  public getVehicles() {
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
    });
  }

  saveVehicle(form: NgForm) {
    console.log(form.value);
    if (this.vehicle.id !== undefined) {
      this.vehicleService.updateVehicles(this.vehicle).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.vehicleService.saveVehicle(this.vehicle).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  deleteVehicle(vehicle: Vehicle) {
    this.vehicleService.deleteVehicle(vehicle).subscribe(() => {
      this.getVehicles();
    });
  }

  editVehicle(vehicle: Vehicle) {
    this.vehicle = { ...vehicle };
  }

  cleanForm(form: NgForm) {
    this.getVehicles();
    form.resetForm();
    const vehicle = {} as Vehicle;
  }

  openDialog(v) {
    const dialogModel = this.matDialog.open(DeleteDialogComponent);
    console.log(v);
  }
}
