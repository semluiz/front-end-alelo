import { VehicleService } from "./../services/vehicle.service";
import { Component, OnInit } from "@angular/core";
import { Vehicle } from "../services/vehicle";

@Component({
  selector: "app-delete-dialog",
  templateUrl: "./delete-dialog.component.html",
  styleUrls: ["./delete-dialog.component.scss"],
})
export class DeleteDialogComponent implements OnInit {
  constructor(public vehicleService: VehicleService) {}

  vehicle = {} as Vehicle;

  vehicles: Vehicle[];

  ngOnInit(): void {
    this.getVehicles();
  }

  public getVehicles() {
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
    });
  }

  deleteVehicle(vehicle: Vehicle) {
    this.vehicleService.deleteVehicle(vehicle).subscribe(() => {
      this.getVehicles();
    });
  }
}
