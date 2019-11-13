import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ICar } from 'app/shared/model/car.model';
import { CarService } from './car.service';

@Component({
  selector: '-car',
  templateUrl: './car.component.html'
})
export class CarComponent implements OnInit, OnDestroy {
  cars: ICar[];
  eventSubscriber: Subscription;

  constructor(protected carService: CarService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.carService.query().subscribe((res: HttpResponse<ICar[]>) => {
      this.cars = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCars();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICar) {
    return item.id;
  }

  registerChangeInCars() {
    this.eventSubscriber = this.eventManager.subscribe('carListModification', () => this.loadAll());
  }
}
