import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInformationModalComponent } from './book-information-modal.component';

describe('BookInformationModalComponent', () => {
  let component: BookInformationModalComponent;
  let fixture: ComponentFixture<BookInformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookInformationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
