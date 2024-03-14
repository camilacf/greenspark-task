import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDetailsComponent } from './widget-details.component';
import { WidgetsService } from '../widgets.service';

describe('WidgetDetailsComponent', () => {
  let component: WidgetDetailsComponent;
  let fixture: ComponentFixture<WidgetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetDetailsComponent],
      providers:[WidgetsService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
