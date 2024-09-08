import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKeyValueStoreComponent } from './add-key-value-store.component';

describe('AddKeyValueStoreComponent', () => {
  let component: AddKeyValueStoreComponent;
  let fixture: ComponentFixture<AddKeyValueStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddKeyValueStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddKeyValueStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
