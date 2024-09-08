import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCreditModifierComponent } from './delete-credit-modifier.component';

describe('DeleteCreditModifierComponent', () => {
  let component: DeleteCreditModifierComponent;
  let fixture: ComponentFixture<DeleteCreditModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCreditModifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCreditModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
