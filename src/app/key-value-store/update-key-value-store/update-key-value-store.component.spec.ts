import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKeyValueStoreComponent } from './update-key-value-store.component';

describe('UpdateKeyValueStoreComponent', () => {
  let component: UpdateKeyValueStoreComponent;
  let fixture: ComponentFixture<UpdateKeyValueStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateKeyValueStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateKeyValueStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
