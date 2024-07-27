import { Routes } from "@angular/router";
import { AccessServicessComponent } from "./access-servicess/access-servicess.component";

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'access-services',
                component: AccessServicessComponent,

            }
        ]
    }
]