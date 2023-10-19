import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompservicesService } from '../Services/compservices.service';

@Component({
  selector: 'app-gcm-notification',
  templateUrl: './gcm-notification.component.html',
  styleUrls: ['./gcm-notification.component.scss']
})
export class GcmNotificationComponent {

  mailtemplate:any = [];
  vapid_key = environment.publicKey
  private swRegistration = null;
  userId:number=0;

  viewMode:string='';

  constructor(private serve:CompservicesService, 
    // private swUpdate: SwUpdate, private swPush: SwPush
    ) { }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem("UserId") || "");
    this.getTemplateList();
    //this.reloadCache();
  }

  key:string = 'subject';
  sort(key:string){
    this.key = key;
  }

  getTemplateList(){
    // this.serve.getMailTemplate().subscribe((res:any)=>{
    //   console.log(res);
    //   this.mailtemplate = res;
    //   this.reloadCache();
    // })
  }

  reloadCache(){
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(()=>{
        if(confirm("New version available! would you like to update?")){
          window.location.reload();
        }
      })
    }
  }

  init() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/assets/sw.js')
        .then(sub => {
          console.log('Service is registered', sub);
          this.swRegistration = sub;
          this.checkSubscription();
        })
        .catch(error => {
          console.error('Service Error', error);
        });
      this.isSupported = true;
    } else {
      console.error("service is not supported")
      this.isSupported = false;
    }
  }
  
  checkSubscription() {
    this.swRegistration.pushManager.getSubscription()
      .then(sub => {
        let subVal = JSON.parse(JSON.stringify(sub));
        console.log(subVal, "subscribed");
        console.log(sub);
        this.isSubscribed = !(sub === null);
        console.log(this.isSubscribed, "subbscribed");
      });
  }

  isSubscribed:boolean=false;
  isRejected:boolean = false;
  isSupported:boolean = false;



  subscribeToNotifications() {
    if(!(this.swPush.isEnabled)){
      console.log("service is not supported");
      return;
    }
    let isSubcribed = localStorage.getItem("is_subs");
    if(isSubcribed !== "true"){
      this.swPush.requestSubscription({
          serverPublicKey: this.vapid_key
      })
      .then((sub:any) => {
        
       let endpoint = JSON.parse(JSON.stringify(sub));
        let obj = new EndpointView();
        obj.endpoint = endpoint.endpoint;
        obj.auth = endpoint.keys.auth;
        obj.p256dh = endpoint.keys.p256dh;
        obj.userId = this.userId;
        obj.subscribed= true;
        obj.rejected = false;

        this.serve.saveEndpoints(obj).subscribe((res:any)=>{
          console.log(res, "response");
          this.isSubscribed = true;
          localStorage.setItem("is_subs", JSON.stringify(this.isSubscribed));
        })
        console.log(endpoint, "subscribed");
      })
      .catch((err:any) =>{
        console.error("Could not subscribe to notifications", err);
        this.isRejected = true;
      } );
    }else{
      console.log("youre already subscribed");
    }
  }




}

export class EndpointView{
  endpoint: string = "";
  userId:number=0;
  auth:string="";
  p256dh:string="";
  subscribed:boolean=false;
  rejected:boolean = false;
}