import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { ColorOptions } from '../../widgets.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

export interface MutableSettings {
  selectedColor: ColorOptions;
  active: boolean;
  linked: boolean
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnChanges, OnDestroy {
  @Input() selectedColor: ColorOptions | undefined;
  @Input() active: boolean | undefined;
  @Input() linked: boolean | undefined;
  @Output() settingsChanged = new EventEmitter<MutableSettings>();
  form = new FormGroup({
    linked: new FormControl(false),
    selectedColor: new FormControl(''),
    active: new FormControl(false),
  })
  private unsubscribe = new Subject<void>();

  ngOnChanges(): void {
    this.form.patchValue({
      linked: this.linked,
      selectedColor: this.selectedColor,
      active: this.active
    });

    this.form.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe(value => {
      this.settingsChanged.emit(value as MutableSettings);
    })
  }

  ngOnDestroy(): void {
      this.unsubscribe.complete();
  }
}
