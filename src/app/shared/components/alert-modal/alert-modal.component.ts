import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertModalComponent implements OnInit {
  public type: string;
  public message: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {

  }

}
