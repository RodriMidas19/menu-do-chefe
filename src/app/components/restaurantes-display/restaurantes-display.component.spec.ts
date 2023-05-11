import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantesDisplayComponent } from './restaurantes-display.component';

describe('RestaurantesDisplayComponent', () => {
  let component: RestaurantesDisplayComponent;
  let fixture: ComponentFixture<RestaurantesDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantesDisplayComponent]
    });
    fixture = TestBed.createComponent(RestaurantesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
