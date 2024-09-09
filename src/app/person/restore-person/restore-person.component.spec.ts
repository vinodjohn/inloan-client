import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePersonComponent } from './restore-person.component';

describe('RestorePersonComponent', () => {
  let component: RestorePersonComponent;
  let fixture: ComponentFixture<RestorePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestorePersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestorePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
