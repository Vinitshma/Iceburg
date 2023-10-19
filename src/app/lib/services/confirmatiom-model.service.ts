import { Injectable } from "@angular/core";

import { BsModalService } from "ngx-bootstrap/modal";
import { ConfirmationModelComponent } from "../confirmation-model/confirmation-model.component";

@Injectable({
  providedIn: "root"
})
export class ConfirmationModalService {
  constructor(private modalService: BsModalService) {}

  createConfirmationModal() {
    const bsModalRef = this.modalService.show(ConfirmationModelComponent, {
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: false
    });
    return bsModalRef;
  }
}
