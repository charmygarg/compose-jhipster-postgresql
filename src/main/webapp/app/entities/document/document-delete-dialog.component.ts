import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';

@Component({
  selector: '-document-delete-dialog',
  templateUrl: './document-delete-dialog.component.html'
})
export class DocumentDeleteDialogComponent {
  document: IDocument;

  constructor(protected documentService: DocumentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.documentService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'documentListModification',
        content: 'Deleted an document'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: '-document-delete-popup',
  template: ''
})
export class DocumentDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ document }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DocumentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.document = document;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/document', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/document', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
