import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitalacPodaciStrComponent } from './citalac-podaci-str.component';

describe('CitalacPodaciStrComponent', () => {
  let component: CitalacPodaciStrComponent;
  let fixture: ComponentFixture<CitalacPodaciStrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitalacPodaciStrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitalacPodaciStrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
