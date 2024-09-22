import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: DashboardComponent,

            }
        ]
    }
]