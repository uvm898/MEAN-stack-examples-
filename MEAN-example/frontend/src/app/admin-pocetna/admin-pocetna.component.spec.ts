import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPocetnaComponent } from './admin-pocetna.component';

describe('AdminPocetnaComponent', () => {
  let component: AdminPocetnaComponent;
  let fixture: ComponentFixture<AdminPocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPocetnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
