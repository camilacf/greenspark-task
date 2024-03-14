# GreensparkTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.
(I developed this project using Angular framework, since it's the one I am most familiar with.)

To run the project simply run `npm i` to install all dependencies and then `ng serve` to build and run on http://localhost:4200.

## The project

Create a front-end service that allows a user to display product widgets as well as update their settings. A product widget domain has immutable properties (id, type, amount, action) and mutable settings (color, active and linked states).

## Description

This is a single page app, where via a service the widgets and it's initial properties are fetch from the API, and stored in a Observable, which is going to be subscribed by each component that needs this information. This service also has a method to updated some properties that are mutable.

The main component is the <b>WidgetsComponent</b>, in which the function to fetch the data from API is called (since it's the outer component), and the list is subscribed. Then we iterate through the list, creating a <b>WidgetDetailsComponent</b> for each. On this component we have the <b>BadgeComponent</b> (where the widgets info is shown) and the <b>SettingsComponent</b>. 
On the Settings there is a form, to control the values of the properties that can be changed. Once they are changed the <i>changeWidgetSettings</i> method from the service is called, and the list is updated, and all the components that are subscribed to it receives the updated data. In the case the <i>active</i> of some widgets is changed to true, still on this same function, all the other widgets' active property is set to false.
Also, there is a simple <b>ColorSelectorComponent</b> to select the widget's color. For the checkbox and toggle, Angular Material was used. With just a few styling ajustments, and changes to the pallete.
The <b>TooltipComponent</b> and Directive, deserves some attention, since it was made from scratch for two reasons: 1. I thought of using Angular Material's tooltip, but it only accepts a text input, so the styling and behavior of the button inside the tooltip couldn't be done. 2. I could use a dialog, or other similiar component, but on this case the behavior of showing and hiding on hover was also not what I needed. So I decided to write my own tooltip so it matches all the specifications I needed.
The TooltipDirective is where the TooltipComponent is constructed, and triggered, when the user mouse is over the element that contains the directive. It passes to the component some positioning information, so that the tooltip appears on the correct place. Once the mouse leaves the hovered element the tooltip closes, unless the mouse goes directly over the tooltip, then it'll only close once the mouse leaves either element.

