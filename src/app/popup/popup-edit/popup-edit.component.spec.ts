import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupEditComponent } from './popup-edit.component';
import { PersonService } from 'src/app/services/api-service.service';


describe('PopupEditComponent', () => {
  let component: PopupEditComponent;
  let fixture: ComponentFixture<PopupEditComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PersonService,
      ],
      declarations: [ PopupEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
