import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[numberonly]'
})
export class NumberonlyDirective {

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedVal:any = event.clipboardData?.getData('text/plain').replace(/\D/g, '');
    document.execCommand('insertText', false, pastedVal);
  }

  @HostListener('keypress', ['$event']) onKeypress(event:KeyboardEvent){
    const charCode = (event.which)? event.which : event.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
    }
    return true;
  }

}
