import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  config: Object = {
    timeOut: 1500,
    closeButton: true,
    disableTimeOut: false,
    tapToDismiss: true,
    progressBar: true,
    progressAnimation: 'increasing',
    positionClass: 'toast-top-right',
  };

  constructor(private toastr: ToastrService) {}

  showSuccess(title: string, message: string) {
    this.toastr.success(message, title, this.config);
  }

  showError(title: string, message: string) {
    this.toastr.error(message, title, this.config);
  }

  showInfo(title: string, message: string) {
    this.toastr.info(message, title, this.config);
  }

  showWarning(title: string, message: string) {
    this.toastr.warning(message, title, this.config);
  }
}
