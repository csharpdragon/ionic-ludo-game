import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userAvatar: Number;
  private userName: String;
  constructor() {
    this.userAvatar=0;
    this.userName="master";
  }
  getUserAvatar(): any{
    return this.userAvatar;
  }
  setUserAvatar(index:Number):void{
    this.userAvatar=index;
  }
  setUserName(name:String){
    this.userName=name;
  }
  getUserName(){
    return this.userName;
  }
}
