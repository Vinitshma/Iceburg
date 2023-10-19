import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserserveService } from '../shared/services/userserve.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public ImageUrl = environment.resources;

  openUserModel:boolean = false;
  UserIds:number=0;
  getSubscription: Subscription[]=[];
  
  userDetails:any;
  urls = new Array<string>();

  private serve = inject(UserserveService);

  ngOnInit(): void { 
    this.UserIds = +JSON.parse(sessionStorage.getItem("U_ID") || '0');
    this.GetprofileDetail();
  }

  ngOnDestroy(){
    this.getSubscription.forEach(x=>x.unsubscribe());
  }

  GetprofileDetail(){
    this.getSubscription.push(this.serve.getUserprofile(this.UserIds).subscribe(
      (res)=>{
        this.userDetails = res;
        console.log(this.userDetails);
      },
      (err)=>{
        console.log(err);
      }
    ))
  }

  profilePicUpload(event:any){
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
    // const img = new Image;

    if(files.length > 0){
      const formData = new FormData();
      formData.append("filename", files[0].name);
      formData.append("images", files[0]);
      formData.append("UserId", JSON.stringify(this.UserIds));

      this.serve.updateProfileImage(formData).subscribe(
        console.log
      );
    }
  }


  editProfile(){
    this.openUserModel = true;
  }

  checkClosed(event:any){
    this.openUserModel = event;
    this.GetprofileDetail();
  }

}
