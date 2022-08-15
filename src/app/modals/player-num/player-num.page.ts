import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { IonModal } from '@ionic/angular';
@Component({
  selector: 'app-player-num',
  templateUrl: './player-num.page.html',
  styleUrls: ['./player-num.page.scss'],
})
export class PlayerNumPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  playerNum: Boolean = true;
  playerName: Boolean = false;
  playerN = 0;
  player1 = "Player1";
  player2 = "Player2";
  player3 = "Player3";
  player4 = "Player4";

  usersArray: Array<number>;
  usersAvatarString: Array<String>;
  avatarShow: Array<Boolean>;
  currentUserIndex;

  currentAvatar;
  constructor(public modalController: ModalController, private router: Router) { }

  ngOnInit() {
    this.usersArray=Array(4).fill(0);
    this.usersAvatarString=Array(4).fill("../../../assets/img/avatars/avatar_0.png");

    this.avatarShow = Array(186).fill(false);
    this.avatarShow[this.currentAvatar] = true;
  }
  dismiss() {
    this.modalController.dismiss();
  }

  selectPlayer(x) {
    this.playerN = x;
    console.log(x);
    this.playerNum = false;
    this.playerName = true;
  }
  startGame() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify({ playerNum: this.playerN, players: [this.player1, this.player2, this.player3, this.player4],avatars: this.usersArray})
      }
    };
    this.dismiss();
    this.router.navigate(['/game-play'], navigationExtras);

  }
  getValue(t) {
    if (t.id == 'player1') {
      this.player1 = t.value
    } else if (t.id == 'player2') {
      this.player2 = t.value;
    } else if (t.id == 'player3') {
      this.player3 = t.value;
    } else if (t.id == "player4") {
      this.player4 = t.value;
    }
  }


  modalOpen(userIndex:number) {
    this.avatarShow.fill(false);
    this.avatarShow[this.usersArray[userIndex-1]] = true;
    this.currentUserIndex=userIndex;
    this.modal.present();
  }
  onAcceptBtnClick() {
    this.usersArray[this.currentUserIndex-1]=this.currentAvatar;
    this.usersAvatarString[this.currentUserIndex-1]="../../../assets/img/avatars/avatar_"+this.currentAvatar+".png";
    this.modal.dismiss();
  }
  onAvatarTap(index) {
    this.avatarShow.fill(false);
    this.avatarShow[index] = true;
    this.currentAvatar = index;
  }
  numSequence(n) {
    return Array(n);
  }
}
