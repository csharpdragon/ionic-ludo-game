import { Injectable } from '@angular/core';
// import { NativeAudio  } from '@awesome-cordova-plugins/native-audio/ngx';
import { Platform } from '@ionic/angular';
import { Audio } from 'capacitor-audio';
@Injectable({
  providedIn: 'root'
})
export class AudioService {

    // private sounds: any[] = [];
    // private audioPlayer: HTMLAudioElement = new Audio();
    // private forceWebAudio: boolean = true; , private nativeAudio: NativeAudio

    constructor(private platform: Platform){
    }
    // preload(key: string, asset: string): void {

    //   if(this.platform.is('cordova') && !this.forceWebAudio){

    //     this.nativeAudio.preloadSimple(key, asset);

    //     this.sounds.push({
    //       key: key,
    //       asset: asset,
    //       isNative: true
    //     });

    //   } else {

    //     let audio = new Audio();
    //     audio.src = asset;

    //     this.sounds.push({
    //       key: key,
    //       asset: asset,
    //       isNative: false
    //     });

    //   }

    // }

    // play(key: string): void {

    //   let soundToPlay = this.sounds.find((sound) => {
    //     return sound.key === key;
    //   });

    //   if(soundToPlay.isNative){

    //     this.nativeAudio.play(soundToPlay.asset).then((res) => {
    //       console.log(res);
    //     }, (err) => {
    //       console.log(err);
    //     });

    //   } else {

    //     this.audioPlayer.src = soundToPlay.asset;
    //     this.audioPlayer.play();

    //   }

    // }
}
