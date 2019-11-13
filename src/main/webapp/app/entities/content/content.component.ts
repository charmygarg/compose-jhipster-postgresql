import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { IContent } from 'app/shared/model/content.model';
import { ContentService } from './content.service';

@Component({
  selector: '-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit, OnDestroy {
  contents: IContent[];
  eventSubscriber: Subscription;

  constructor(protected contentService: ContentService, protected dataUtils: JhiDataUtils, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.contentService.query().subscribe((res: HttpResponse<IContent[]>) => {
      this.contents = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInContents();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IContent) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInContents() {
    this.eventSubscriber = this.eventManager.subscribe('contentListModification', () => this.loadAll());
  }
}
