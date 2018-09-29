import { Component } from "@angular/core";
import { EmpModel, CompletedModel } from "./EmpModel";
import { EmpDataClass, CompletedAction } from "./EmpModel";

@Component({
  selector: "app-home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [EmpDataClass, CompletedAction]
})
export class HomeComponent {
  public empListDataFromAPI: EmpModel[];
  public completedActionData: CompletedModel[];
  public LoanTotalCalculated: number;
  public empRevList: EmpModel[];
  public empAppList: EmpModel[];
  public currentLoginUserId: string;
  //// constructor
  constructor(
    private empDataClass: EmpDataClass,
    private completedAction: CompletedAction
  ) {
    this.currentLoginUserId = "110";
    this.LoanTotalCalculated = 5000;
    this.empListDataFromAPI = this.empDataClass.empMockData;
    this.completedActionData = this.completedAction.completedActionMockData;
  }

  fetchData() {
    //return this.empListDataFromAPI;
  }
}
