import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCorrespondenceComponent } from './delete-correspondence.component';

describe('DeleteCorrespondenceComponent', () => {
  let component: DeleteCorrespondenceComponent;
  let fixture: ComponentFixture<DeleteCorrespondenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCorrespondenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCorrespondenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
