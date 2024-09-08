import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteKeyValueStoreComponent } from './delete-key-value-store.component';

describe('DeleteKeyValueStoreComponent', () => {
  let component: DeleteKeyValueStoreComponent;
  let fixture: ComponentFixture<DeleteKeyValueStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteKeyValueStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteKeyValueStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
