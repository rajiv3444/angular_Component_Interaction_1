import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home-page/home.component";
import { LoanApprovalComponent } from "./loan/loan-approval.component";

@NgModule({
  declarations: [HomeComponent, LoanApprovalComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule {}
