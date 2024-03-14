import { Component } from '@angular/core';
import { WidgetsService } from './widgets.service';
import { Widget } from './widgets.model';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss'
})
export class WidgetsComponent {
  widgetList: Widget[];
  private unsubscribe = new Subject<void>();
  constructor(private widgetService: WidgetsService){}

  ngOnInit(){
    this.widgetService.getWidgets().pipe(take(1)).subscribe();
    this.widgetService.widgetList.pipe(takeUntil(this.unsubscribe)).subscribe(widgets => {
      this.widgetList = widgets;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }
}
