import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';

@Component({
  selector: '-document',
  templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy {
  documents: IDocument[];
  eventSubscriber: Subscription;

  constructor(protected documentService: DocumentService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.documentService.query().subscribe((res: HttpResponse<IDocument[]>) => {
      this.documents = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInDocuments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDocument) {
    return item.id;
  }

  registerChangeInDocuments() {
    this.eventSubscriber = this.eventManager.subscribe('documentListModification', () => this.loadAll());
  }
}
