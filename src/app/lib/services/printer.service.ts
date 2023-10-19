import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  constructor() { }

  printTable(tableId:string){
    let printArea =  (document.getElementById(tableId) as HTMLElement).innerHTML;
    const WinPrint = window.open('', '', 'width=800,height=900');
    if(WinPrint){
      WinPrint.document.write(`
      <html>
        <head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
          ${printArea}
        </body>
      </html>
      `);
      WinPrint.document.close();
      WinPrint.focus();
      setTimeout(() => {
        WinPrint.print();
        WinPrint.close();
      }, 1000);
    }
  }
}
