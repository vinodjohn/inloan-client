import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreCreditModifierComponent } from './restore-credit-modifier.component';

describe('RestoreCreditModifierComponent', () => {
  let component: RestoreCreditModifierComponent;
  let fixture: ComponentFixture<RestoreCreditModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestoreCreditModifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoreCreditModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
