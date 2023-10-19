import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[textOnly]'
})
export class TextOnlyDirective {

  private pattern = /^[a-zA-Z._\s]([a-zA-Z]+ ?)*$/;

  @HostListener("keypress", ["$event"]) onKeypress(event:KeyboardEvent) {
    const value: string = String.fromCharCode(event.keyCode)
    if (this.pattern.test(value)) {
      return true;
    }else{
      event.preventDefault();
      return false;
    }
  }

}
