import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditModifierComponent } from './add-credit-modifier.component';

describe('AddCreditModifierComponent', () => {
  let component: AddCreditModifierComponent;
  let fixture: ComponentFixture<AddCreditModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCreditModifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCreditModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
