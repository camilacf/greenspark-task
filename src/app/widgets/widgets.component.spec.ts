import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetsComponent } from './widgets.component';
import { WidgetsService } from './widgets.service';

describe('WidgetsComponent', () => {
  let component: WidgetsComponent;
  let fixture: ComponentFixture<WidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetsComponent],
      providers:[WidgetsService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
