import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Widget } from '../widgets.model';
import { MutableSettings } from './settings/settings.component';
import { WidgetsService } from '../widgets.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-widget-details',
  templateUrl: './widget-details.component.html',
  styleUrl: './widget-details.component.scss'
})
export class WidgetDetailsComponent implements OnInit, OnDestroy{
  @Input() widgetId: number;
  @Output() activeWidget = new EventEmitter<number>();
  widget: Widget | undefined;
  private unsubscribe = new Subject<void>();

  constructor(private widgetService: WidgetsService){}

  ngOnInit(): void {
    this.widgetService.widgetList.pipe(takeUntil(this.unsubscribe)).subscribe(list => {
      this.widget = list.find(widget => widget.id === this.widgetId);
    })
  }

  onSettingsChange(widgetSettings: MutableSettings){
    if(this.widget){
      this.widget = {...this.widget, ...widgetSettings};
      this.widgetService.changeWidgetSettings(this.widget);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }
}
