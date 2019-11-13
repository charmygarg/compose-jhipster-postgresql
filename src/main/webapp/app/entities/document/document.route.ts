import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { DocumentComponent } from './document.component';
import { DocumentDetailComponent } from './document-detail.component';
import { DocumentUpdateComponent } from './document-update.component';
import { DocumentDeletePopupComponent } from './document-delete-dialog.component';
import { IDocument } from 'app/shared/model/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentResolve implements Resolve<IDocument> {
  constructor(private service: DocumentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocument> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((document: HttpResponse<Document>) => document.body));
    }
    return of(new Document());
  }
}

export const documentRoute: Routes = [
  {
    path: '',
    component: DocumentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Documents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DocumentDetailComponent,
    resolve: {
      document: DocumentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Documents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DocumentUpdateComponent,
    resolve: {
      document: DocumentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Documents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DocumentUpdateComponent,
    resolve: {
      document: DocumentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Documents'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const documentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DocumentDeletePopupComponent,
    resolve: {
      document: DocumentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Documents'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
