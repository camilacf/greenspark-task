import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorOptions } from '../../../widgets.model';

type SelectedColorOnChange = (value: string) => void;
type SelectedColorOnTouched = () => void;

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.scss',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: ColorSelectorComponent,
      multi: true
    }
  ]
})
export class ColorSelectorComponent implements ControlValueAccessor {
  selectedColor = '';
  colorOptions: string[] = Object.values(ColorOptions);
  disable: boolean;

  onChange: SelectedColorOnChange = (value) => {};
  onTouched: SelectedColorOnTouched = () => {};

  writeValue(obj: string): void {
    this.selectedColor = obj;
  }

  registerOnChange(fn: SelectedColorOnChange): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: SelectedColorOnTouched): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.onChange(this.selectedColor);
    this.onTouched();
  }
}
