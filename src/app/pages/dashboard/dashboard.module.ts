import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './dashboard.routing';
import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { NgApexchartsModule } from "ng-apexcharts";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }
