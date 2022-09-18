import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';

import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, DialogModule, FormsModule],
  exports: [HomeComponent],
})
export class HomeModule {}
