import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared/shared.module';
import { ContentComponent } from './content.component';
import { ContentDetailComponent } from './content-detail.component';
import { ContentUpdateComponent } from './content-update.component';
import { ContentDeletePopupComponent, ContentDeleteDialogComponent } from './content-delete-dialog.component';
import { contentRoute, contentPopupRoute } from './content.route';

const ENTITY_STATES = [...contentRoute, ...contentPopupRoute];

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContentComponent,
    ContentDetailComponent,
    ContentUpdateComponent,
    ContentDeleteDialogComponent,
    ContentDeletePopupComponent
  ],
  entryComponents: [ContentDeleteDialogComponent]
})
export class JhipsterContentModule {}
