import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditModifierComponent } from './credit-modifier.component';

describe('CreditModifierComponent', () => {
  let component: CreditModifierComponent;
  let fixture: ComponentFixture<CreditModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditModifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
