import { Component, Input, OnInit } from "@angular/core";
import { EmpModel } from "../home-page/EmpModel";

@Component({
  selector: "app-loan-approval",
  templateUrl: "./loan-approval.component.html",
  styleUrls: ["./loan-approval.component.css"]
})
export class LoanApprovalComponent implements OnInit {
  /** */
  /**constants */
  public _REV1: string = "REV_1";
  public _REV2: string = "REV_2";
  public _APPRV1: string = "APPRV_1";
  public _APPRV2: string = "APPRV_2";

  /**Input param sent by parent component. emp list json data from service call */
  @Input()
  public empListDataFromParent: EmpModel[];
  @Input()
  public loanTotalAmount: number;

  /**Filtered employee list to bind with dropdown */
  public Reviewer_1_EmpList: EmpModel[];
  public Reviewer_2_EmpList: EmpModel[];
  public Approver_1_EmpList: EmpModel[];
  public Approver_2_EmpList: EmpModel[];

  /**chekox status for is-completed status  */
  public Rev_1_IsComplete: boolean = undefined;
  public Rev_2_IsComplete: boolean;
  public APPRV_1_IsComplete: boolean;
  public APPRV_IsComplete: boolean;

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.

    console.log("inside child");
    console.log("loanTotalAmount from parent:" + this.loanTotalAmount);

    console.log(this.empListDataFromParent);

    this.bindReviewerApproberDropDown(this.empListDataFromParent);

    console.log(this.Reviewer_1_EmpList);
    console.log(this.Reviewer_2_EmpList);
  }

  // OnRev1Change(event, selectedEmpId: string) {
  //   console.log("selectedValue: " + selectedEmpId);
  //   this.SetActionCompleteStatus(selectedEmpId, this._REV1);
  // }

  // OnRev2Change(event, selectedEmpId: string) {
  //   console.log("selectedValue: " + selectedEmpId);
  //   this.SetActionCompleteStatus(selectedEmpId, this._REV2);
  // }

  OnRevChange(event, selectedEmpId: string) {
    console.log("selectedValue: " + selectedEmpId);
    this.SetActionCompleteStatus(selectedEmpId, event.target.id);
  }

  SetActionCompleteStatus(selectedEmpId: string, EmpRole: string) {
    switch (EmpRole) {
      case this._REV1: {
        let emp = this.Reviewer_1_EmpList.find(
          a => a.EmpId == selectedEmpId && a.IsReviewer.toUpperCase() === "Y"
        );
        if (typeof emp != "undefined" && emp != null) {
          this.Rev_1_IsComplete =
            emp.IsCompleted.toUpperCase() === "Y" &&
            emp.IsCompleted.toUpperCase() !== "N"
              ? true
              : undefined;
        }
        break;
      }
      case this._REV2: {
        let emp = this.Reviewer_2_EmpList.find(
          a => a.EmpId == selectedEmpId && a.IsReviewer.toUpperCase() === "Y"
        );
        if (typeof emp != "undefined" && emp != null) {
          this.Rev_2_IsComplete =
            emp.IsCompleted.toUpperCase() === "Y" &&
            emp.IsCompleted.toUpperCase() !== "N"
              ? true
              : undefined;
        }
        break;
      }

      default: {
        //statements;
        break;
      }
    }
  }

  bindReviewerApproberDropDown(empList: EmpModel[]) {
    this.Reviewer_1_EmpList = empList.filter(
      a => a.IsReviewer.toUpperCase() === "Y"
    );
    this.Reviewer_2_EmpList = empList.filter(
      a =>
        a.IsReviewer.toUpperCase() === "Y" &&
        a.LoanLimit >= this.loanTotalAmount
    );

    this.Approver_1_EmpList = empList.filter(
      a => a.IsApprover.toUpperCase() === "Y"
    );
    this.Approver_2_EmpList = empList.filter(
      a =>
        a.IsApprover.toUpperCase() === "Y" &&
        a.LoanLimit >= this.loanTotalAmount
    );
  }
}
