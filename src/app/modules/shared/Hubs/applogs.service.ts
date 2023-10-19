import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ApplogsService {

  hubUrl: string;
  private connection1!:signalR.HubConnection;
  private connection2!:signalR.HubConnection;
  userId!:string;
  token:string="";

  constructor(private http:HttpClient) {
    this.hubUrl = environment.huburl + "/userhub";
  }

  public async initiateConnections(): Promise<void> {
    try {

      //user first visit to app connection1
      //user if he is admin connection2
      //user once logged get notification connection3
      //user if using chat app connection4

      // Angular with signalR: Multiple hubconnections to the same route
      // this.hubConnection = this.window.$.hubConnection();
      // this.hubConnection.url = this.apiUrl  + "api/signalr";
      // this.hubEvent1Proxy = this.hubConnection.createHubProxy("Event1Hub");
      // this.hubEvent2Proxy = this.hubConnection.createHubProxy("Event2Hub");

      this.connection1 = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Error)
        .withUrl(this.hubUrl,
      {
        accessTokenFactory: () => this.token
      }).withAutomaticReconnect([1500,3000,5000]).build();

    }
    catch (error) {
      console.info(`SignalR connection error: ${error}`);
    }
  }
  
}
