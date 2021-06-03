import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TajetaCreditoComponent } from './tajeta-credito.component';

describe('TajetaCreditoComponent', () => {
  let component: TajetaCreditoComponent;
  let fixture: ComponentFixture<TajetaCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TajetaCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TajetaCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
