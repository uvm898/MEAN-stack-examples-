import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiKnjigaComponent } from './detalji-knjiga.component';

describe('DetaljiKnjigaComponent', () => {
  let component: DetaljiKnjigaComponent;
  let fixture: ComponentFixture<DetaljiKnjigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljiKnjigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaljiKnjigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
