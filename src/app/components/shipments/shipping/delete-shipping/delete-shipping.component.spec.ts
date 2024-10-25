import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShippingComponent } from './delete-shipping.component';

describe('DeleteShippingComponent', () => {
  let component: DeleteShippingComponent;
  let fixture: ComponentFixture<DeleteShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteShippingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
