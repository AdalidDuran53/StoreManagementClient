import { TestBed } from '@angular/core/testing';

import { ItemClientService } from './item-client.service';

describe('ItemClientService', () => {
  let service: ItemClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
