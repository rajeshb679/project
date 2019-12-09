import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDropDownDirective]',
})
export class DropDownDirectiveDirective {
    @HostBinding('class.open') isOpen = false;
    @HostListener('document:click', ['$event']) onToggle(event: Event): void {
        // this.isOpen = !this.isOpen;
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
        // console.log(this.elRef);
        // console.log(event);
    }
    constructor(private elRef: ElementRef) {}
}
