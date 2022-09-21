import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitalacProfilComponent } from './citalac-profil.component';

describe('CitalacProfilComponent', () => {
  let component: CitalacProfilComponent;
  let fixture: ComponentFixture<CitalacProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitalacProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitalacProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
