import { Component, OnInit ,ViewChild} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { Router, NavigationExtras, Route } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  @ViewChild(IonModal) smallModal: IonModal;
  currentAngle=0;
  math;
  progress1;
  progress2;
  playnums;
  currentColor;
  showSetting:Boolean;
  constructor(public modalController: ModalController,private router:Router) {
  }


  presentModal(){
    this.showSetting=false;
    this.smallModal.present();
  }
  ngOnInit() {
    this.showSetting=true;
    this.math=Math;
    this.startTimer();
    this.progress1=2;
    this.progress2=2;
    this.playnums=2;
    this.currentColor=0;
  }
  numClickminus(){
    if(this.playnums>2)
      this.playnums=this.playnums-1;
  }
  numClickadd(){
    if(this.playnums<4)
      this.playnums=this.playnums+1;
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

  settingClick(){
    this.showSetting=true;
    this.smallModal.present();
  }
  minusClick1(){
    if(this.progress1 > 2){
       this.progress1=this.progress1-1;
      }
  }
  minusClick2(){
    if(this.progress2 > 1){
       this.progress2=this.progress2-1;
    }
  }

  addClick1(){
    if(this.progress1 <4){
      this.progress1=this.progress1+1;
    }
  }
  addClick2(){
    if(this.progress2 <10){
       this.progress2=this.progress2+1;
    }
  }
  acceptClick(){
    this.smallModal.dismiss();
  }

  currentClick(num){
    this.currentColor=num;
  }
  play(){
    this.smallModal.dismiss();
    let navigationdata:NavigationExtras={
      queryParams:{
        special:JSON.stringify({playerNum:this.playnums,playerColor:this.currentColor})
      }
    };
    this.router.navigate(['/game-play'],navigationdata);
  }
}
