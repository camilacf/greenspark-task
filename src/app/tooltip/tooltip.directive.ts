import {
    ApplicationRef, ComponentRef, createComponent, Directive, ElementRef, EmbeddedViewRef, HostListener, Input, OnDestroy
  } from '@angular/core';
  import { TooltipComponent } from './tooltip.component';
import { Subject, takeUntil } from 'rxjs';
  
  @Directive({ selector: '[app-tooltip]' })
  export class TooltipDirective implements OnDestroy {
    @Input('app-tooltip') tooltipText: string;
    @Input('app-tooltip-link') tooltipLinkText: string;
    private unsubscribe = new Subject<void>();

    private componentRef: ComponentRef<TooltipComponent> | null = null;
  
    constructor(
      private elementRef: ElementRef,
      private appRef: ApplicationRef
    ) { }
  
    @HostListener('mouseover')
    mouseover(): void {
      if (this.componentRef === null && this.tooltipText) {
        this.componentRef = createComponent(TooltipComponent, { environmentInjector: this.appRef.injector });
        this.componentRef.instance.mouseLeft.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
          this.mouseleave();
        })
        this.appRef.attachView(this.componentRef.hostView);
        document.body.append((<EmbeddedViewRef<any>> this.componentRef.hostView).rootNodes[0]);
        this.setTooltipComponentProperties();
      }
    }
  
    private setTooltipComponentProperties(): void {
      if (this.componentRef !== null) {
        this.componentRef.instance.text = this.tooltipText;
        this.componentRef.instance.link = this.tooltipLinkText;
        const { left, right, bottom } = this.elementRef.nativeElement.getBoundingClientRect();
        this.componentRef.instance.parentLeft = left;
        this.componentRef.instance.parentRight = right;
        this.componentRef.instance.parentBottom = bottom;
      }
    }
  
    @HostListener('mouseleave')
    mouseleave(): void {
      setTimeout(() => {
        if(!this.componentRef?.instance.mouseOver){
          this.destroy();
        }
      }, 200)

    }
  
    ngOnDestroy(): void {
      this.destroy();
      this.unsubscribe.complete();
    }
  
    private destroy(): void {
      if (this.componentRef !== null) {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.componentRef = null;
      }
    }
  }
  