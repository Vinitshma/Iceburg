export interface Menu{
    MenuId:number;
    name:string;
    icon:string;
    url:string;
    childList:Array<SubMenu>;
}
export interface SubMenu{
    MenuId:number;
    name:string;
    url:string;
}
export interface MenuResponse {
    type: string;
    value: Array<Menu>;
}
  