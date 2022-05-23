import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionDataComponent } from './adoption-data.component';

describe('AdoptionDataComponent', () => {
  let component: AdoptionDataComponent;
  let fixture: ComponentFixture<AdoptionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoptionDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
