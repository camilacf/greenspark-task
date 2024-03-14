import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Widget, WidgetDto } from "./widgets.model";

const apiLink = 'https://api.mocki.io/v2/016d11e8/product-widgets';

@Injectable({ providedIn: 'root' })
export class WidgetsService {
    widgetList = new BehaviorSubject<Widget[]>([]);
    constructor(private http: HttpClient){}

    getWidgets(): Observable<void>{
        return this.http.get<WidgetDto[]>(apiLink).pipe(map(widgets => {
            this.setWidgets(widgets);
            widgets.map(w => new Widget(w));
        }))
    }

    setWidgets(list: Widget[]){
        this.widgetList.next(list);
    }

    changeWidgetSettings(changedWidget: Widget){
        this.widgetList.next(this.widgetList.value.map(widget => {
            if(widget.id === changedWidget.id){
                widget = changedWidget;
            }
            if(changedWidget.active){
                widget.active = widget.id === changedWidget.id;
            }
            return widget;
        }))
    }
}
