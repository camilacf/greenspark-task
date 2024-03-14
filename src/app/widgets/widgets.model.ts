export interface WidgetDto {
    id: number;
    type: WidgetType;
    amount: number;
    action: WidgetAction;
    active: boolean;
    linked: boolean;
    selectedColor: ColorOptions;
}

export class Widget implements WidgetDto {
    id: number;
    type: WidgetType;
    amount: number;
    action: WidgetAction;
    active: boolean;
    linked: boolean;
    selectedColor: ColorOptions;

    constructor(data?: WidgetDto){
        if(data){
            Object.assign(this, data);
        }
    }
}

export enum WidgetType {
    carbon = "carbon",
    plastica_bottles = "plastic bottles",
    trees = "trees"
}

export enum WidgetAction {
    collects = "collects",
    plants = "plants",
    offsets = "offsets"
}

export enum ColorOptions {
    white = "white",
    black = "black",
    blue = "blue",
    green = "green",
    beige = "beige"
}
