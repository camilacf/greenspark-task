import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ColorOptions, Widget, WidgetType } from '../../widgets.model';
import { WidgetsService } from '../../widgets.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent implements OnInit, OnDestroy {
  @Input() widgetId: number;
  widgetType = WidgetType;
  logoUrl: string;
  logoColor: string;
  widget: Widget | undefined;
  private unsubscribe = new Subject<void>();

  constructor(private widgetService: WidgetsService){}

  ngOnInit(): void {
    this.widgetService.widgetList.pipe(takeUntil(this.unsubscribe)).subscribe(list => {
      this.widget = list?.find(widget => widget.id === this.widgetId);
      this.logoColor = this.getLogoColor();
      this.logoUrl = this.getLogoUrl();
    })
  }

  getLogoUrl(){
    return `assets/images/logo_${this.logoColor}.svg`
  }

  getLogoColor(): string {
    switch(this.widget?.selectedColor){
      case ColorOptions.beige:
      case ColorOptions.white:
        return 'green';
      default:
        return 'white';
    }
  }

  ngOnDestroy(): void {
      this.unsubscribe.complete();
  }
}
