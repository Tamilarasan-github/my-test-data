import { Injectable } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class NgbModalService
{
    constructor(private ngbModal:NgbModal)
    {

    }

    open(content:any) {
        this.ngbModal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      openBiggerModal(content:any) {
        this.ngbModal.open(content, {windowClass:"xlModal", ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    
      dismiss()
      {
        this.ngbModal.dismissAll();
      }
      
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }
}