import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(arr: any, property:string, order:string ) {
    if(!arr || arr.length < 0){
     return arr;
    }
 
    const arrDataType = typeof(arr[0]["property"]);
 
    let currType = order;
    if(order === "asc"){
     currType = "desc";
    }else{
     currType = "asc";
    }
 
    if(currType === "desc"){
     if(arrDataType === "string"){
       return arr.sort((a:any, b:any)=>a["property"].toLowerCase().localeCompare(b["property"].toLowerCase()));
     }else if(arrDataType === "number"){
       return arr.sort((a:any, b:any)=> a["property"] - b["property"]);
     }else{
       return arr.sort((a:any, b:any)=> a["property"] < b["property"])
     }
    }else{
     if(arrDataType === "string"){
       return arr.sort((a:any, b:any)=>b["property"].toLowerCase().localeCompare(a["property"].toLowerCase()));
     }else if(arrDataType === "number"){
       return arr.sort((a:any, b:any)=> -b["property"] - a["property"]);
     }else{
       return arr.sort((a:any, b:any)=> b["property"] < a["property"])
     }
    }
  }

}
