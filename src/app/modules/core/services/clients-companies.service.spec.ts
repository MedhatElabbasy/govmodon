import { TestBed } from '@angular/core/testing';

import { ClientsCompaniesService } from './clients-companies.service';

describe('ClientsCompaniesService', () => {
  let service: ClientsCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
