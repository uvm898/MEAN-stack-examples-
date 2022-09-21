import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezPretragaComponent } from './rez-pretraga.component';

describe('RezPretragaComponent', () => {
  let component: RezPretragaComponent;
  let fixture: ComponentFixture<RezPretragaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezPretragaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RezPretragaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
