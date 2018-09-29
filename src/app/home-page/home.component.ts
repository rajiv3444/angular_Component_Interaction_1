import { Component } from "@angular/core";
import { EmpModel } from "./EmpModel";
import { EmpDataClass } from "./EmpModel";

@Component({
  selector: "app-home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [EmpDataClass]
})
export class HomeComponent {
  empListDataFromAPI: EmpModel[];
  LoanTotalCalculated: number;
  empRevList: EmpModel[];
  empAppList: EmpModel[];

  //// constructor
  constructor(private empDataClass: EmpDataClass) {
    this.LoanTotalCalculated = 5000;
    this.empListDataFromAPI = this.empDataClass.mockData;
  }

  fetchData() {
    //return this.empListDataFromAPI;
  }
}
