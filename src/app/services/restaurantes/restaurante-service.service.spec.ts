import { TestBed } from '@angular/core/testing';

import { RestauranteServiceService } from './restaurante-service.service';

describe('RestauranteServiceService', () => {
  let service: RestauranteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestauranteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
