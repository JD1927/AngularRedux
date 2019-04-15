import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './services/alert.service';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AlertService
  ],
  exports: []
})
export class SharedModule { }
