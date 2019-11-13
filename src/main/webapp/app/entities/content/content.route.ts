import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Content } from 'app/shared/model/content.model';
import { ContentService } from './content.service';
import { ContentComponent } from './content.component';
import { ContentDetailComponent } from './content-detail.component';
import { ContentUpdateComponent } from './content-update.component';
import { ContentDeletePopupComponent } from './content-delete-dialog.component';
import { IContent } from 'app/shared/model/content.model';

@Injectable({ providedIn: 'root' })
export class ContentResolve implements Resolve<IContent> {
  constructor(private service: ContentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContent> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((content: HttpResponse<Content>) => content.body));
    }
    return of(new Content());
  }
}

export const contentRoute: Routes = [
  {
    path: '',
    component: ContentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Contents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContentDetailComponent,
    resolve: {
      content: ContentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Contents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContentUpdateComponent,
    resolve: {
      content: ContentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Contents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContentUpdateComponent,
    resolve: {
      content: ContentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Contents'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const contentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ContentDeletePopupComponent,
    resolve: {
      content: ContentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Contents'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
