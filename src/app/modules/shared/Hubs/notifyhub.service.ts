import { APP_INITIALIZER, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class NotifyhubService {

  hubUrl!: string;
  connection!: signalR.HubConnection;
  userId!:string;

  constructor() { }

  public async initiateConnections(): Promise<void> {
    try {
      this.connection = new HubConnectionBuilder().configureLogging(signalR.LogLevel.Information).withUrl(this.hubUrl,
        {
          skipNegotiation:true,
          transport:signalR.HttpTransportType.WebSockets
        }).withAutomaticReconnect([1500,3000,5000]).build();
        // accessTokenFactory:()=>"token"
        //signalR.LogLevel.None
       if(this.userId != null){
         await this.connection.start().then(() => {
           console.info(`connection success!`);
         })
         .catch((err: string) => console.info('error while establishing connection: ' + err));
 
         this.connection.onreconnecting(() => {
           console.log('connection connecting ...');
         });
         
         this.connection.onreconnected(() => {
           console.log('connection reconnected .');
         });
         
         this.connection.onclose((error:any)=>{
           console.log(error, "connection closed");
           setTimeout(() => {
             this.connection.stop();
             this.connection.start().then(() => {
               console.info(`connection success!`);
             })
           }, 5000);
         })
 
         await this.connectedState();
         await this.getConnectionStatus();
         await this.getConnectionStatus();
       }else{
        this.connection.stop();
       }
    }
    catch (error) {
      console.info(`SignalR connection error: ${error}`);
    }
  }

  private connectedState(){
    this.connection.on("UserConnected", (connectionId)=>{
      console.info(connectionId, "connection Id");
      if(connectionId != null){
        this.setClientMethods(connectionId);
      }
    })
  } 

  private setClientMethods(connectionId:any) {
    let userid = localStorage.getItem("UserId");
    if(connectionId != null){
      this.connection.invoke("UserConnection", userid, connectionId)
      .catch(function (err) {
        return console.error(err.toString());
      });
    }
  }

  private getConnectionStatus(){
    this.connection.on("ConnectionAdded", (message, userid)=>{
      console.info(message+ " by " + userid, "notification");
    })
  }
}

export const hubConectionsProvider = [
  {
    provide: APP_INITIALIZER,
    useFactory: (NotifyhubService: NotifyhubService) => () => NotifyhubService.initiateConnections(),
    deps: [NotifyhubService],
    multi: true,
  }
]