import { Injectable } from "@angular/core";
import { Vehicle } from "./vehicle";
import { ConfigService } from "./config.services";
// import { map, filter, switchMap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpHeaderResponse,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  url = "http://localhost:8080/api";

  //injetando o HttpCliente
  constructor(private httpClient: HttpClient) {}

  //Headers
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "Application/JSON" }),
  };

  //obtem todos os carros
  getVehicles(): Observable<Vehicle[]> {
    return this.httpClient
      .get<Vehicle[]>(this.url + "/vehicles")
      .pipe(retry(2), catchError(this.handleError));
  }

  //obtem um carro pelo id
  getVehiclesById(id: number): Observable<Vehicle> {
    return this.httpClient
      .get<Vehicle>(this.url + "/vehicle/" + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  //salvando os produtos
  saveVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient
      .post<Vehicle>(
        this.url + "/vehicle",
        JSON.stringify(vehicle),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  //Atualizando os produtos
  updateVehicles(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient
      .put<Vehicle>(
        this.url + "/vehicle/",
        JSON.stringify(vehicle),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  //Deleta um produto
  deleteVehicle(vehicle: Vehicle) {
    return this.httpClient
      .delete<Vehicle>(this.url + "/vehicle/" + vehicle.id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  //Manipulação de Erros
  handleError(error: HttpErrorResponse) {
    let errorMessagge = "";

    if (error.error instanceof ErrorEvent) {
      errorMessagge = error.error.message;
    } else {
      errorMessagge =
        `Codigo do Erro ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessagge);
    return throwError(errorMessagge);
  }
}
