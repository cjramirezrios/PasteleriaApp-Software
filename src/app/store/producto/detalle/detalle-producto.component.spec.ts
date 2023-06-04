import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProductoComponent } from './detalle-producto.component';

describe('DetalleComponent', () => {
  let component: DetalleProductoComponent;
  let fixture: ComponentFixture<DetalleProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
