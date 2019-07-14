import { Component, OnInit } from '@angular/core';

import { Subscriptions, SubscriptionsApi } from '../../../../interfaces/subscriptions';

import { SubscriptionsService } from '../../../../services/subscriptions.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  subscriptions: Subscriptions[] = [];
  errors = {
    subscriptionsIsLoaded: false,
    subscriptionsIsSuccessful: false
  };
  sortField = '';
  sortType = true;

  constructor(
    private subscriptionsService: SubscriptionsService
  ) {
  }

  ngOnInit() {

    setTimeout(() => {
      this.getSubscriptions();
    }, 1000);

  }

  sortSubscriptions(field): void {
    this.sortType = this.sortField !== field
      ? true
      : !this.sortType;

    this.sortField = field;

    this.subscriptions.sort((a, b) => {
      return this.sortType
        ? +(a[field] > b[field]) || -1
        : +(a[field] < b[field]) || -1;
    });
  }

  private getSubscriptions(): void {
    this.subscriptionsService.getJSON().subscribe(
      (data: SubscriptionsApi[]) => {
        data.forEach((item) => {
          const id = item.Id;
          const name = item.Name;
          const cost = +(item.Cost.substring(1));

          this.subscriptions.push({
            id,
            name,
            cost
          });
        });
        this.errors.subscriptionsIsLoaded = true;
        this.errors.subscriptionsIsSuccessful = true;
      },
      () => {
        this.errors.subscriptionsIsLoaded = true;
      });
  }
}