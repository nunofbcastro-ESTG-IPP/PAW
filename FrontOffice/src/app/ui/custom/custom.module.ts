import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomImgComponent } from './custom-img/custom-img.component';
import { CustomLoadingScreenComponent } from './custom-loading-screen/custom-loading-screen.component';

@NgModule({
  declarations: [CustomImgComponent, CustomLoadingScreenComponent],
  imports: [CommonModule],
  exports: [CustomImgComponent, CustomLoadingScreenComponent],
})
export class CustomModule {}
