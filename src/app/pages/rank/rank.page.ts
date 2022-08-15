import { Component, OnInit,ViewChild } from '@angular/core';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { LoadingController  } from '@ionic/angular';
@Component({
  selector: 'app-rank',
  templateUrl: './rank.page.html',
  styleUrls: ['./rank.page.scss'],
})
export class RankPage implements OnInit {
 currentAngle=0;
  math;

   ///// score hardcode data
   scoredata=[
    {avatar:0,name:'Brute',score:345},
    {avatar:4,name:'Brut',score:345},
    {avatar:3,name:'baby',score:345},
    {avatar:8,name:'ninja',score:345},
    {avatar:3,name:'steer',score:345},
    {avatar:23,name:'dragon',score:345},
    {avatar:120,name:'mighty',score:345},
    {avatar:40,name:'byd',score:345},
    {avatar:56,name:'spider',score:345},
    {avatar:23,name:'healer',score:345},
    {avatar:123,name:'twinkle',score:345},
    {avatar:34,name:'pushy',score:345},
    {avatar:64,name:'hairy',score:345},
  ];

  /////

  constructor(private loadingCtrl:LoadingController) { }
  async ionViewDidEnter(){
    const loading = await this.loadingCtrl.create({
      message: 'Checking status...',
      cssClass:'custom-loading',
      duration: 3000,
      showBackdrop: true,
      spinner: 'circles',
    });
    loading.present();
  }
   ngOnInit() {
    this.math=Math;
    this.startTimer();



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
}
