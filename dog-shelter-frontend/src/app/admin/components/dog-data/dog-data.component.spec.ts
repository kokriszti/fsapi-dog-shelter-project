import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogDataComponent } from './dog-data.component';

describe('DogDataComponent', () => {
  let component: DogDataComponent;
  let fixture: ComponentFixture<DogDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
