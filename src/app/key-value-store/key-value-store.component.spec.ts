import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyValueStoreComponent } from './key-value-store.component';

describe('KeyValueStoreComponent', () => {
  let component: KeyValueStoreComponent;
  let fixture: ComponentFixture<KeyValueStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyValueStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyValueStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
