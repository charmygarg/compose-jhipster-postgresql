import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared/shared.module';
import { DocumentComponent } from './document.component';
import { DocumentDetailComponent } from './document-detail.component';
import { DocumentUpdateComponent } from './document-update.component';
import { DocumentDeletePopupComponent, DocumentDeleteDialogComponent } from './document-delete-dialog.component';
import { documentRoute, documentPopupRoute } from './document.route';

const ENTITY_STATES = [...documentRoute, ...documentPopupRoute];

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DocumentComponent,
    DocumentDetailComponent,
    DocumentUpdateComponent,
    DocumentDeleteDialogComponent,
    DocumentDeletePopupComponent
  ],
  entryComponents: [DocumentDeleteDialogComponent]
})
export class JhipsterDocumentModule {}
