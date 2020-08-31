
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CartModalPage } from './cart-modal.page';


describe("CartModalPage", () => {
  let component: CartModalPage;
  let fixture: ComponentFixture<CartModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [ CartModalPage ],
      imports: [IonicModule.forRoot(),  RouterTestingModule.withRoutes([])]

    }).compileComponents();

    fixture = TestBed.createComponent(CartModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
