import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './extensions.routing';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ExtensionsComponent } from './extensions/extensions.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ExtensionsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgbHighlight,
    AsyncPipe,
    HttpClientModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
  ],
  providers: [HttpClient, DecimalPipe]
})
export class ExtensionsModule { }
