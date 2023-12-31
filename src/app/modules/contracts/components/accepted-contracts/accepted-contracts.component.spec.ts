import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedContractsComponent } from './accepted-contracts.component';

describe('AcceptedContractsComponent', () => {
  let component: AcceptedContractsComponent;
  let fixture: ComponentFixture<AcceptedContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
