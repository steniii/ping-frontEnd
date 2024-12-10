import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPingFormComponent } from './add-ping-form.component';

describe('AddPingFormComponent', () => {
  let component: AddPingFormComponent;
  let fixture: ComponentFixture<AddPingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
