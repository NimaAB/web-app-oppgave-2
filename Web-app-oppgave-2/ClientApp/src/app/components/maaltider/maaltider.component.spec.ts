import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaaltiderComponent } from './maaltider.component';

describe('MaaltiderComponent', () => {
  let component: MaaltiderComponent;
  let fixture: ComponentFixture<MaaltiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaaltiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaaltiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
