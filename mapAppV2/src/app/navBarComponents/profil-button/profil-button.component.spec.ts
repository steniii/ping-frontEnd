import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilButtonComponent } from './profil-button.component';

describe('ProfilButtonComponent', () => {
  let component: ProfilButtonComponent;
  let fixture: ComponentFixture<ProfilButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
