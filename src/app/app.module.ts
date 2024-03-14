import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { WidgetsComponent } from "./widgets/widgets.component";
import { WidgetDetailsComponent } from "./widgets/widget-details/widget-details.component";
import { CommonModule } from "@angular/common";
import { SettingsComponent } from "./widgets/widget-details/settings/settings.component";
import { BadgeComponent } from "./widgets/widget-details/badge/badge.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { ColorSelectorComponent } from "./widgets/widget-details/settings/color-selector/color-selector.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipDirective } from "./tooltip/tooltip.directive";
import { TooltipComponent } from "./tooltip/tooltip.component";

@NgModule({
    declarations: [
        AppComponent, 
        WidgetsComponent, 
        WidgetDetailsComponent,
        SettingsComponent,
        BadgeComponent,
        ColorSelectorComponent,
        TooltipDirective,
        TooltipComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule, 
        HttpClientModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        RouterModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule{}
