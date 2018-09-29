import { Component, Input, OnInit } from "@angular/core";
import { EmpModel, CompletedModel } from "../home-page/EmpModel";

@Component({
  selector: "app-loan-approval",
  templateUrl: "./loan-approval.component.html",
  styleUrls: ["./loan-approval.component.css"]
})
export class LoanApprovalComponent implements OnInit {
  /**constants */
  public _REV1: string = "REV_1";
  public _REV2: string = "REV_2";
  public _APPRV1: string = "APPRV_1";
  public _APPRV2: string = "APPRV_2";
  /************************************************************ */

  /**Input data from service call */
  @Input()
  public empListDataFromParent: EmpModel[];
  @Input()
  public completedActionDataFromDb: CompletedModel[];
  @Input()
  public loanTotalAmount: number;
  @Input()
  public loggedInUserId: string;
  /************************************************************ */

  /**Filtered employee list to bind with dropdown */
  public empListRevwr_1: EmpModel[];
  public empListRevwr_2: EmpModel[];
  public empListApprover_1: EmpModel[];
  public empListApprover_2: EmpModel[];
  public empListTemp: EmpModel[];
  /************************************************************ */

  /**checkox status for is-completed status  */
  public Rev_1_IsComplete: boolean = undefined;
  public Rev_2_IsComplete: boolean;
  public APPRV_1_IsComplete: boolean;
  public APPRV_2_IsComplete: boolean;
  /************************************************************ */

  public selectedEmpIdRev1: string;
  public selectedEmpIdRev2: string;
  public selectedEmpIdApprvr1: string;
  public selectedEmpIdApprvr2: string;

  /**dropdown */
  public IsDdDisabledRev1: boolean;
  public IsDdDisabledRev2: boolean;
  public IsDdDisabledApprvr1: boolean;
  public IsDdDisabledApprvr2: boolean;

  /**radio */
  public IsRadioDisabledRev1: boolean;
  public IsRadioDisabledRev2: boolean;
  public IsRadioDisabledApprvr1: boolean;
  public IsRadioDisabledApprvr2: boolean;

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.

    /**Remove logged in user from list */
    this.empListTemp = this.empListDataFromParent.filter(
      a => a.EmpId !== this.loggedInUserId
    );

    console.log("completedActionDataFromDb");
    console.log(this.completedActionDataFromDb);
    console.log("inside child");
    console.log("loanTotalAmount from parent:" + this.loanTotalAmount);

    console.log(this.empListTemp);

    this.bindReviewerApproberDropDown(this.empListTemp);

    console.log(this.empListRevwr_1);
    console.log(this.empListRevwr_2);
    this.SetDropDownAsPerSavedAction();
  }

  SetDropDownAsPerSavedAction() {
    let reviewer1 = this.completedActionDataFromDb.find(
      a => a.UserAction.toUpperCase() === "REVIEWER_1"
    );
    let reviewer2 = this.completedActionDataFromDb.find(
      a => a.UserAction.toUpperCase() === "REVIEWER_2"
    );
    let approver1 = this.completedActionDataFromDb.find(
      a => a.UserAction.toUpperCase() === "APPROVER_1"
    );
    let approver2 = this.completedActionDataFromDb.find(
      a => a.UserAction.toUpperCase() === "APPROVER_2"
    );
    if (typeof reviewer1 != "undefined" && reviewer1 != null) {
      //this.empListApprover_1 = this.empListApprover_1.filter(a => a.EmpId == reviewer1.CompletedByUserId);
      this.selectedEmpIdRev1 = reviewer1.CompletedByUserId;
      let actionLocked = reviewer1.IsCompleted.toUpperCase() == "Y";
      this.IsDdDisabledRev1 = actionLocked;
      this.Rev_1_IsComplete = actionLocked;
      this.IsRadioDisabledRev1 = actionLocked;
    }
    if (typeof reviewer2 != "undefined" && reviewer2 != null) {
      this.selectedEmpIdRev2 = reviewer2.CompletedByUserId;
      let actionLocked = reviewer2.IsCompleted.toUpperCase() == "Y";
      this.IsDdDisabledRev2 = actionLocked;
      this.Rev_2_IsComplete = actionLocked;
      this.IsRadioDisabledRev2 = actionLocked;
    }
  }

  // OnRev1Change(event, selectedEmpId: string) {
  //   console.log("selectedValue: " + selectedEmpId);
  //   this.SetActionCompleteStatus(selectedEmpId, this._REV1);
  // }

  // OnRev2Change(event, selectedEmpId: string) {
  //   console.log("selectedValue: " + selectedEmpId);
  //   this.SetActionCompleteStatus(selectedEmpId, this._REV2);
  // }

  OnCheckBoxClick(event) {
    let clickedSrc = event.target.id;

    switch (clickedSrc) {
      case "rev-1-yes":
      case "rev-1-no": {
        this.IsDdDisabledRev1 = clickedSrc === "rev-1-yes";
        break;
      }
      case "rev-2-yes":
      case "rev-2-no": {
        this.IsDdDisabledRev2 = clickedSrc === "rev-2-yes";
        break;
      }

      case "appr-1-yes":
      case "appr-1-no": {
        this.IsDdDisabledApprvr1 = clickedSrc === "appr-1-yes";
        break;
      }
      case "appr-2-yes":
      case "appr-2-no": {
        this.IsDdDisabledApprvr1 = clickedSrc === "appr-2-yes";
        break;
      }
    }

    //alert("okk");
  }

  OnReviewerApproverChange(event, selectedEmpId: string) {
    console.log("selectedValue: " + selectedEmpId);
    this.SetActionCompleteStatus(selectedEmpId, event.target.id);
  }

  SetActionCompleteStatus(selectedEmpId: string, EmpRole: string) {
    if (selectedEmpId == "-1") return;

    switch (EmpRole) {
      /**Revewer *****************************************/
      case this._REV1: {
        let emp = this.empListRevwr_1.find(
          a => a.EmpId == selectedEmpId && a.IsReviewer.toUpperCase() === "Y"
        );
        if (typeof emp != "undefined" && emp != null) {
          this.Rev_1_IsComplete =
            emp.IsCompleted.toUpperCase() === "Y" &&
            emp.IsCompleted.toUpperCase() !== "N"
              ? true
              : undefined;
          this.empListRevwr_2 = this.empListRevwr_2.filter(
            a => a.EmpId != selectedEmpId
          );
        }
        break;
      }
      case this._REV2: {
        let emp = this.empListRevwr_2.find(
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

      /** Approver ********************************************* */
      case this._APPRV1: {
        let emp = this.empListApprover_1.find(
          a => a.EmpId == selectedEmpId && a.IsApprover.toUpperCase() === "Y"
        );
        if (typeof emp != "undefined" && emp != null) {
          this.APPRV_1_IsComplete =
            emp.IsCompleted.toUpperCase() === "Y" &&
            emp.IsCompleted.toUpperCase() !== "N"
              ? true
              : undefined;
        }
        break;
      }
      case this._APPRV2: {
        let emp = this.empListApprover_2.find(
          a => a.EmpId == selectedEmpId && a.IsApprover.toUpperCase() === "Y"
        );
        if (typeof emp != "undefined" && emp != null) {
          this.APPRV_2_IsComplete =
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
    this.empListRevwr_1 = empList.filter(
      a => a.IsReviewer.toUpperCase() === "Y"
    );
    this.empListRevwr_2 = empList.filter(
      a =>
        a.IsReviewer.toUpperCase() === "Y" &&
        a.LoanLimit >= this.loanTotalAmount
    );

    this.empListApprover_1 = empList.filter(
      a => a.IsApprover.toUpperCase() === "Y"
    );
    this.empListApprover_2 = empList.filter(
      a =>
        a.IsApprover.toUpperCase() === "Y" &&
        a.LoanLimit >= this.loanTotalAmount
    );
  }
}
