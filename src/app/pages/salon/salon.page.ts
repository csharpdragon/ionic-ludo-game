import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';
@Component({
  selector: 'app-salon',
  templateUrl: './salon.page.html',
  styleUrls: ['./salon.page.scss'],
})
export class SalonPage implements OnInit {
  avatarUrl:String;
  userName:String;
  constructor(private userInfo:UserInfoService) { }

  ngOnInit() {
    this.avatarUrl='../../../assets/img/avatars/avatar_'+this.userInfo.getUserAvatar()+'.png';
    this.userName=this.userInfo.getUserName();
  }
  onSendBtn(){

  }
  numSequence(n){
    return Array(n);
  }
}
