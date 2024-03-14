import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tooltip',
  styleUrls: ['./tooltip.component.scss'],
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class TooltipComponent implements AfterViewInit {
  public mouseOver: boolean;
  public mouseLeft = new Subject<boolean>();
  @ViewChild('tooltipWrapper') tooltipWrapper!: ElementRef;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  text = '';
  link = '';
  parentLeft = 0;
  parentRight = 0;
  parentBottom = 0;
  leftPosition = 0;
  tooltipHeight = 0;
  
  @HostListener('mouseover')
  mouseover(): void {
    this.mouseOver = true;
  }

  @HostListener('mouseleave')
  mouseleave(): void {
    this.mouseOver = false;
    this.mouseLeft.next(true);
  }

  ngAfterViewInit(): void {
    const tooltipWidth = this.tooltipWrapper.nativeElement.getBoundingClientRect().width;
    this.tooltipHeight = this.tooltipWrapper.nativeElement.getBoundingClientRect().height;
    this.calculateInitialLeftPosition(tooltipWidth);
    this.adjustPositionIfExceedsWindow(tooltipWidth);
    this.changeDetector.detectChanges();
  }

  private calculateInitialLeftPosition(tooltipWidth: number): void {
    const centerPosition = this.calculateCenterPosition();
    this.leftPosition = centerPosition - tooltipWidth / 2;
  }

  private calculateCenterPosition(): number {
    return (this.parentRight - this.parentLeft) / 2 + this.parentLeft;
  }

  private adjustPositionIfExceedsWindow(tooltipWidth: number): void {
    const windowWidth = window.innerWidth;
    const rightPosition = this.leftPosition + tooltipWidth;
    if (rightPosition > windowWidth) {
      const overflow = rightPosition - windowWidth;
      this.leftPosition -= overflow;
    }

    if (this.leftPosition < 0) {
      this.leftPosition = 0;
    }
  }
}
