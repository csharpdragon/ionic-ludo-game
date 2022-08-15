import { UserInfoService } from './../../services/user-info.service';
import { Component, ViewChild ,OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.page.html',
  styleUrls: ['./usersetting.page.scss'],
})
export class UsersettingPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  currentClick:String;
  currentAngle=0;
  math;


  //////wrapper avatar
  avatarShow:Array<Boolean>;
  currentAvatar;
  //////user avatar
  userAvatar:String;
  //////user name
  userName:String;

  nameInput:Boolean;
  constructor(private userInfo:UserInfoService) { }
  ngOnInit() {
    this.avatarShow=Array(186).fill(false);
    this.currentAvatar=this.userInfo.getUserAvatar();
    this.avatarShow[this.currentAvatar]=true;

    this.math=Math;
    this.startTimer();
    this.currentClick="";
    this.nameInput=false;
    this.userAvatar='../../../assets/img/avatars/avatar_'+this.currentAvatar+'.png';

    this.userName=this.userInfo.getUserName();
  }
  startTimer(){
    const counter=setInterval(()=>{
      this.currentAngle+=0.2;
      this.currentAngle=this.currentAngle%360;
    },20);
  }
  numSequence(n){
    return Array(n);
  }
  setOpen(){
    this.modalOpen();
  }
  setting(){
    this.currentClick="setting";
    this.modalOpen();
  }
  removeClick(){
    this.currentClick="remove";
    this.modalOpen();
  }
  loginClick(){
    this.currentClick="login";
    this.modalOpen();
  }
  avatarClick(){
    this.currentClick="avatar";
    this.modalOpen();
  }

  modalOpen(){
    this.currentAvatar=this.userInfo.getUserAvatar();
    this.avatarShow.fill(false);
    this.avatarShow[this.currentAvatar]=true;
    this.modal.present();
  }
  onAcceptBtnClick(){
    console.log("clicked");
    this.userInfo.setUserAvatar(this.currentAvatar);
    this.userAvatar='../../../assets/img/avatars/avatar_'+this.currentAvatar+'.png';
    this.modal.dismiss();
  }
  onAvatarTap(index){
    this.avatarShow.fill(false);
    this.avatarShow[index]=true;
    this.currentAvatar=index;
  }
  onChange($event){
    this.userInfo.setUserName($event.target.value);
  }
}
