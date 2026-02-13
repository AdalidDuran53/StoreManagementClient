import { TestBed } from '@angular/core/testing';

import { ItemStoreService } from './item-store.service';

describe('ItemStoreService', () => {
  let service: ItemStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
