import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCreditModifierComponent } from './update-credit-modifier.component';

describe('UpdateCreditModifierComponent', () => {
  let component: UpdateCreditModifierComponent;
  let fixture: ComponentFixture<UpdateCreditModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCreditModifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCreditModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
