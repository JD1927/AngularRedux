import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private modalService: NgbModal) {}

  openAlertModalMessage(type: string, message: string) {
    // Getting instance
    const modalRef = this.modalService.open(AlertModalComponent, { centered: true, windowClass: 'dark-modal' });
    // Setting properties
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.message = message;
  }
}
