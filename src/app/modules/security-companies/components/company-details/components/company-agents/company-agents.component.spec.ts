import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAgentsComponent } from './company-agents.component';

describe('CompanyAgentsComponent', () => {
  let component: CompanyAgentsComponent;
  let fixture: ComponentFixture<CompanyAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAgentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
