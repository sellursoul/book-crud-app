import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleBookModalComponent } from './handle-book-modal.component';

describe('HandleBookModalComponent', () => {
  let component: HandleBookModalComponent;
  let fixture: ComponentFixture<HandleBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleBookModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandleBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
