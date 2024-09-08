import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreKeyValueStoreComponent } from './restore-key-value-store.component';

describe('RestoreKeyValueStoreComponent', () => {
  let component: RestoreKeyValueStoreComponent;
  let fixture: ComponentFixture<RestoreKeyValueStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestoreKeyValueStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoreKeyValueStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
