import { Routes } from "@angular/router";
import { ExtensionsComponent } from "./extensions/extensions.component";

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'extensions',
                component: ExtensionsComponent,
            }
        ]

    }
]