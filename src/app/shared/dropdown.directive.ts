import {Directive} from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective {
	@HostListener('click') click(eventData: Event) {

	}

	constructor(private elRef: ElementRef, private) {}
}
