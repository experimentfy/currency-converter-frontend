import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';



import { AdminLayoutRoutes } from './admin-layout.routing';

import { CurrencyConverterComponent }            from '../../pages/currency-converter/currency-converter.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    CurrencyConverterComponent
  ]
})

export class AdminLayoutModule {}
