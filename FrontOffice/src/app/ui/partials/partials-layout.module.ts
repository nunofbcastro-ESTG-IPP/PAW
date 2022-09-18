import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PartialHeaderComponent } from './partial-header/partial-header.component';
import { PartialFooterComponent } from './partial-footer/partial-footer.component';
import { PartialCartComponent } from './partial-cart/partial-cart.component';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { CustomModule } from '../custom/custom.module';

@NgModule({
  declarations: [
    PartialHeaderComponent,
    PartialFooterComponent,
    PartialCartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    MenuModule,
    CustomModule,
  ],
  exports: [
    PartialHeaderComponent,
    PartialFooterComponent,
    PartialCartComponent,
  ],
})
export class PartialsLayoutModule {}
