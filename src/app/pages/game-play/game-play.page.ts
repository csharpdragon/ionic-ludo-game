
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as confetti from 'canvas-confetti';
export type Options = confetti.Options;
import { ActivatedRoute, Router } from '@angular/router';
import { maleNames, femaleNames } from './names';
import { UserInfoService } from 'src/app/services/user-info.service';
import { IonModal } from '@ionic/angular';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.page.html',
  styleUrls: ['./game-play.page.scss'],

})
export class GamePlayPage implements OnInit {
  @ViewChild(IonModal) leavModal: IonModal;
  ///firewrks related
  @Input() interval = 4000;
  @Input() options: Options;
  @Input() useWorker: boolean;
  confettis: (options?: confetti.Options) => Promise<null>;
  timer;
  visible: boolean;
  canvasId: string;
  canvas: HTMLCanvasElement;
  stopped = true;

  playerNum: number;
  turnArray: any = [];
  players: Array<String> = ['', '', '', ''];
  showHome: Array<Boolean>;
  usersAvatar: any = [];
  // usersName: any = [];
  turnAvatar: String;
  turnName: String;
  userNo: Array<number> = [];
  userFinished: Boolean;
  previousBotmove: number;
  myName;
  myAvatar;
  turn: number = 0;
  showColoredAnimation: Boolean = false;
  animateHome;
  CanAcceptEnvet: Boolean;
  playerColor;
  animateCol;
  rollDiceB = true;
  progammingRoll: Boolean;
  posStart = [0, 13, 26, 39];  //red ,green ,blue ,yellow
  posEnd = [50, 11, 24, 37];
  homeShow;
  locationShow;
  locationShowColored;
  homeLeft = [4, 4, 4, 4];
  homeWon = [0, 0, 0, 0];
  lastThrowValue;
  pieces = {
    0: 'red',
    1: 'green',
    2: 'blue',
    3: 'yellow'
  };
  diceColor = 'white';
  random = 0;
  dice: Array<string> = ['cubeRed', 'cubeGreen', 'cubeBlue', 'cubeYellow'];
  turnCounter = -1;
  winArray = [];
  first = true;
  loop = true;
  valueMove = 0;
  posCounterMove = 0;
  y = 0;
  moveStartPoint;
  posCounterColored = 0;
  valueColored = 0;
  six = false;
  posCounter = 0;
  scores=[0,0,0,0];
  starPos=[8,21,34,47];
  sixAccum;
  constructor(private nativeAudio:NativeAudio,private route: ActivatedRoute, private router: Router, private elementRef: ElementRef, private userInfo: UserInfoService) {
  };
  ngOnInit() {
    this.nativeAudio.preloadSimple('roll','assets/audio/roll.mp3');
    this.nativeAudio.preloadSimple('move','assets/audio/move.mp3');
    this.initGame();
  }
  ionViewWillLeave() {
    this.stop();
    this.nativeAudio.unload('roll');
    this.nativeAudio.unload('move');
  }
  ////check piece can move
  canMove(turn, piece,valueForMove){
    let expectedpos=(piece+valueForMove)%52;
    if(this.posEnd[this.turn]>piece&&valueForMove>this.posEnd[this.turn]-piece)
    {
      return true;
    }
    if(this.posStart.includes(expectedpos)){
      let startOwnerTurn=this.posStart.indexOf(expectedpos);
      if(turn!==startOwnerTurn){
        if(this.locationShow[startOwnerTurn][expectedpos][0])
        {
          return false;
        }
      }
    }

    if(this.starPos.includes(expectedpos)){
      for(let j=0;j<this.playerNum;j++){
        if(turn!==this.turnArray[j] && this.locationShow[this.turnArray[j]][expectedpos][0]>0){
            return false;
        }
      }
    }
    return true;
  }

  continueGame(){
    this.variablesInit();
    this.nextTurn();
    return;
  }
  playersInit(){
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.playerNum = JSON.parse(params.special).playerNum;
        this.playerColor = JSON.parse(params.special).playerColor;
      }
      if (this.playerNum === 2) {
        this.turnArray = [this.playerColor, (this.playerColor + 2) % 4];
        this.players[0] = this.userInfo.getUserName();
        this.usersAvatar[0] = this.userInfo.getUserAvatar();
        this.players[1] = maleNames[Math.floor(Math.random() * maleNames.length)];
        this.usersAvatar[1] = Math.floor(Math.random() * 93) * 2;
      }
      else if (this.playerNum === 3) {
        this.turnArray = [(this.playerColor + 3) % 4, this.playerColor, (this.playerColor + 1) % 4];
        this.players[0] = maleNames[Math.floor(Math.random() * maleNames.length)];
        this.usersAvatar[0] = Math.floor(Math.random() * 93) * 2;
        this.players[1] = this.userInfo.getUserName();
        this.usersAvatar[1] = this.userInfo.getUserAvatar();
        this.players[2] = femaleNames[Math.floor(Math.random() * femaleNames.length)];
        this.usersAvatar[2] = Math.floor(Math.random() * 93) * 2 + 1;
      }
      else if (this.playerNum === 4) {
        this.turnArray = [this.playerColor, (this.playerColor + 1) % 4, (this.playerColor + 2) % 4, (this.playerColor + 3) % 4];
        this.players[0] = this.userInfo.getUserName();
        this.usersAvatar[0] = this.userInfo.getUserAvatar();

        this.players[1] = maleNames[Math.floor(Math.random() * maleNames.length)];
        this.usersAvatar[1] = Math.floor(Math.random() * 93) * 2;

        this.players[2] = femaleNames[Math.floor(Math.random() * femaleNames.length)];
        this.usersAvatar[2] = Math.floor(Math.random() * 93) * 2 + 1;

        this.players[3] = maleNames[Math.floor(Math.random() * maleNames.length)];
        this.usersAvatar[3] = Math.floor(Math.random() * 93) * 2;
      }

      for (let i = 0; i < this.playerNum; i++) {
        this.showHome[this.turnArray[i]] = true;
      }

      this.myName = this.userInfo.getUserName();
      this.myAvatar = this.userInfo.getUserAvatar();
      this.userNo.push(this.playerColor);
    });
  }
  variablesInit(){
    this.sixAccum=0;
    this.showHome = [false, false, false, false];
    this.userFinished = false;
    this.stop();
    this.animateHome = ['', '', '', ''];
    this.showColoredAnimation = false;
    this.turn = 0;
    this.animateCol = [
      [[0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0]],
      [[0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0]],
      [[0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0]],
      [[0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0]],
    ];
    this.rollDiceB = true;
    this.homeShow = [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]];
    this.locationShow = [
      [[0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0]],  //for red
      [[0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0]],    //for green
      [[0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],],   //for blue
      [[0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0]],   //for yellow
    ];
    this.locationShowColored = [
      [[0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0]],
      [[0], [0], [0], [0], [0]]
    ];
    this.homeLeft = [4, 4, 4, 4];
    this.homeWon = [0, 0, 0, 0];
    this.random = 0;
    this.turnCounter = -1;
    this.winArray = [];
    this.canvasId = `canvasRef${Math.random()
      .toString()
      .slice(0, 6)
      .replace('.', '')}`;

    this.progammingRoll = false;
    this.previousBotmove = 0;
    this.CanAcceptEnvet = true;
    this.first = true;
    this.loop = true;
    this.valueMove = 0;
    this.posCounterMove = 0;
    this.posCounterColored = 0;
    this.valueColored = 0;
    this.six = false;
    this.posCounter = 0;


    for (let i = 0; i < this.playerNum; i++) {
        this.showHome[this.turnArray[i]] = true;
      }

  }
  initGame() {
    this.variablesInit();
    ////////////////
    this.playersInit();
    this.nextTurn();
    return;
  }
  setItemVisibility({ target, visible }: { target: Element; visible: boolean }): void {
    this.visible = visible;
    if (visible) {
      this.canvas = this.elementRef.nativeElement.querySelector(`#${this.canvasId}`) as HTMLCanvasElement;
      if (!this.canvas) {
        return;
      }
      this.confettis = confetti.create(this.canvas, {
        resize: true,
        useWorker: this.useWorker
      });
    }
  }
  start() {
    this.stopped = false;
    this.timer = setInterval(() => this.fire(), this.interval);
  }

  stop() {
    this.stopped = true;
    window.clearInterval(this.timer);
  }
  fire() {
    this.confettis(this.options);
  }
  viewFireworks() {
    for(let i=0;i<4;i++){
      this.scores[i]+=this.homeWon[i];
    }

    this.userFinished = true;
    this.timer = setInterval(() => {
      this.confettis(this.options);
    }, 1500);
  }
  ionViewDidLeave(){
    this.nativeAudio.unload('roll');
    this.nativeAudio.unload('move');
  }
  checkIsUser(): Boolean {
    for (let i = 0; i < this.userNo.length; i++)
      if (this.userNo[i] == this.turn)
        return true;
    return false;
  }
  decideShowFireworks(){
    if (this.homeWon[this.turn] === 4) {
      if (!this.winArray.includes(this.turn)) {
        this.winArray = [...this.winArray, this.turn];
        if (this.winArray.length === this.playerNum - 1) {
          this.userFinished = true;
          for (let i = 0; i < this.playerNum; i++) {
            if (!this.winArray.includes(this.turnArray[i])) {
              this.winArray = [...this.winArray, this.turnArray[i]];
              break;
            }
          }
          this.viewFireworks();
          return;
        }
        if (this.checkIsUser()) {
          this.userFinished = true;
          for (let i = this.winArray.length; i < this.playerNum; i++) {
            let maxscore = -1;
            let maxIndex = -1;
            for (let j = 0; j < this.playerNum; j++) {
              if (!this.winArray.includes(this.turnArray[j]) && this.homeWon[this.turnArray[j]] > maxscore) {
                maxscore = this.homeWon[this.turnArray[j]];
                maxIndex = j;
              }
            }
            if (maxIndex !== -1) {
              this.winArray = [...this.winArray, this.turnArray[maxIndex]];
            }
          }
          this.viewFireworks();
          return;
        }
      }
    }
  }
  nextTurn() {
    this.sixAccum=0;
    this.lastThrowValue = 0;
    console.log("turnStart: " + this.turn);
    this.previousBotmove = 0;
    this.decideShowFireworks();
    this.turnCounter++;

    if (this.turnCounter >= this.playerNum) {
      this.turnCounter = 0;
    }
    this.turn = this.turnArray[this.turnCounter];
    // console.log(this.turnArray);
    // this.turn = this.userNo;
    // this.turn = 1;
    this.turnAvatar = "../../../assets/img/avatars/avatar_" + this.usersAvatar[this.turnCounter] + ".png";
    this.turnName = this.players[this.turnCounter];
    this.rollDiceB = true;

    if (this.homeWon[this.turn] == 4) {
      this.nextTurn();
      return;
    }
    if (!this.checkIsUser()) {
      this.autoPlay();
      return;
    }
  }

  autoPlay() {
    setTimeout(() => {
      this.rollDiceB = true;
      this.rollDice(true);
    }, 1000);
  }

  penelty(){
    for(let i=0;i<this.locationShow[this.turn].length;i++){
      if(this.locationShow[this.turn][i][0]){
        this.locationShow[this.turn][i][0]--;
        for(let j=0;j<4;j++){
          if(this.homeShow[this.turn][j]==0){
            this.homeShow[this.turn][j]=1;
            this.homeLeft[this.turn]++;
            break;
          }
        }
        break;
      }
    }
    setTimeout(()=>{
      this.nextTurn();
    },350);
    return;
  }

  rollDice(program: Boolean = false) {
    if (!this.checkIsUser())
      if (program == false) {
        console.log("not your turn");
        return;
      }
    if (this.rollDiceB) {
      this.nativeAudio.play('roll');
      this.rollDiceB = false
      var min = 1;
      var max = 24;
      var xRand = 360;//this.getRandom(max,min);
      var yRand = 1440;//this.getRandom(max,min);
      //  console.log(xRand,yRand);

      var cube = document.getElementById("cubeBlue");
      cube.style.webkitTransform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
      cube.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';

      setTimeout(() => {
        var random = this.getRandomNumber(7, 1);
        if (random == 6) {
          xRand = 90;// this.getRandom(max, min);
          yRand = 180;//this.getRandom(max, min);
          this.six = true;
        } else if (random == 1) {
          xRand = 180;
          yRand = 180;
          this.six = false;
        } else if (random == 2) {
          xRand = 180;
          yRand = 0;
          this.six = false;
        }
        else if (random == 3) {
          xRand = 180;
          yRand = 90;
          this.six = false;
        }
        else if (random == 5) {
          xRand = -90;
          yRand = 0;
          this.six = false;
        }
        else if (random == 4) {
          xRand = 0;
          yRand = 90;
          this.six = false;
        }
        //  console.log(xRand,yRand);
        cube.style.webkitTransform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
        cube.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
        //console.log(random);
        setTimeout(() => {
          this.nativeAudio.stop('roll');
          if (random == 6) {
            this.sixAccum++;
            if(this.sixAccum==3){
              this.penelty();
              return;
            }
            var colorP = 0;
            for (var i = 0; i < 5; i++) {
              colorP = colorP + this.locationShowColored[this.turn][i][0];
            }
            var noneColorCanMove=0;
            var noneColorCannotMove=0;
            for(var i=0;i<this.locationShow[this.turn].length;i++){
              if(this.locationShow[this.turn][i][0]){
                if( this.canMove(this.turn,i,random))
                  noneColorCanMove++;
                else noneColorCannotMove++;
              }
            }
            if (this.homeWon[this.turn] + colorP + noneColorCannotMove == 4) {
              this.nextTurn();
              return;
            }
            if(this.locationShow[this.turn][this.posStart[this.turn]][0]==2){
              if(!noneColorCanMove){
                this.nextTurn();
                return;
              }
            }
            if (this.homeLeft[this.turn] == 4) { // + this.homeWon[this.turn]
              this.locationShow[this.turn][this.posStart[this.turn]][0] = 1;
              this.homeLeft[this.turn]--;
              this.homeShow[this.turn][0] = 0;
              console.log('roll dice again');
              //////for bots
              this.rollDiceB = true;
              if (!this.checkIsUser()) { this.rollDiceB = false; this.autoPlay(); return; }
            } else {
              console.log('choose your move');
              this.lastThrowValue = random;
              this.animateHome[0] = '';
              this.animateHome[1] = '';
              this.animateHome[2] = '';
              this.animateHome[3] = '';
              this.animateHome[this.turn] = 'animateP';
              for (let p = 0; p < this.animateCol[this.turn].length; p++) {
                this.animateCol[0][p][0] = 0;
                this.animateCol[1][p][0] = 0;
                this.animateCol[2][p][0] = 0;
                this.animateCol[3][p][0] = 0;
                this.animateCol[this.turn][p][0] = 'animateP';
              }


              if (!this.checkIsUser()) {
                this.lastThrowValue = 6;
                this.botChooseMove(this.previousBotmove);
                return;
              }
            }

          } else {
            var positions = [];
            var colorP = 0;
            for (var i = 0; i < 5; i++) {
              if (this.locationShowColored[this.turn][i][0]) {
                positions.push(i);
                colorP = colorP + this.locationShowColored[this.turn][i][0];
              }
            }

            var noneColorCanMove=0;
            var noneColorCannotMove=0;
            for(var i=0;i<this.locationShow[this.turn].length;i++){
              if(this.locationShow[this.turn][i][0]){
                if( this.canMove(this.turn,i,random))
                  noneColorCanMove++;
                else noneColorCannotMove++;
              }
            }
            var next = true;
            if (this.homeLeft[this.turn] + this.homeWon[this.turn] == 4) {
              setTimeout(() => {

                this.nextTurn();
                console.log('next turn ', this.turn);
              }, 250);
              return;
            }

            if (this.homeLeft[this.turn] + this.homeWon[this.turn] + colorP + noneColorCannotMove== 4 && positions.length >= 1) {
              for (var t = 0; t < positions.length; t++) {
                if (5 - positions[t] == random) {
                  next = false;
                } else {
                }
              }

              if (next) {
                this.nextTurn();
                return;
              }
              console.log("pieces in colored regin is ", colorP);
            }

            this.lastThrowValue = random;

            console.log('choose your move');
            for (let p = 0; p < this.animateCol[this.turn].length; p++) {
              this.animateCol[0][p][0] = 0;
              this.animateCol[1][p][0] = 0;
              this.animateCol[2][p][0] = 0;
              this.animateCol[3][p][0] = 0;
              this.animateCol[this.turn][p][0] = 'animateP';
            }

            if (!this.checkIsUser()) {
              this.botChooseMove(this.previousBotmove);
              return;
            }

          }

        }, 500);
      }, 500);
    }
    else {
      console.log("not allowed to roll dice");
    }
  }
  getRandom(max, min) {
    return (Math.floor(Math.random() * (max - min)) + min) * 90;
  }

  getRandomNumber(max, min) {
    if (this.first) { this.first = false; return 6; }
    return (Math.floor(Math.random() * (max - min)) + min);
  }
  moveOut(p, pos) {
    console.log('moving out ', p);
    if(this.locationShow[this.turn][this.posStart[this.turn]][0]==2)
    {
      return;
    }
    if (this.pieces[this.turn] == p) {
      var start = this.posStart[this.turn];
      var value = this.lastThrowValue;
      if (value == 6) {
        this.locationShow[this.turn][start][0]++;
        this.homeShow[this.turn][pos] = 0;
        for (let k = 0; k < this.animateCol[this.turn].length; k++) {
          this.animateCol[0][k][0] = 0;
          this.animateCol[1][k][0] = 0;
          this.animateCol[2][k][0] = 0;
          this.animateCol[3][k][0] = 0;
        }
        this.animateHome[0] = '';
        this.animateHome[1] = '';
        this.animateHome[2] = '';
        this.animateHome[3] = '';
        this.homeShow[this.turn][pos] = 0;
        console.log(p, ' position showed on box 0');
        this.homeLeft[this.turn] -= 1;
        this.rollDiceB = true;
        this.cutPiece(p, start);
        this.CanAcceptEnvet = true;
        if (!this.checkIsUser()) {
          this.lastThrowValue = 0;
          this.autoPlay();
          return;
        }
      } else {
        console.log('no 6 to move out');
      }
    } else {
      console.log("its not your turn");
    }
  }
  cutPiece(piece, from) {
    for (let j = 0; j < 4; j++) {
      if (piece == this.pieces[j])
        continue;
      else {
        if (this.locationShow[j][from][0]) {
          this.homeLeft[j] += this.locationShow[j][from][0];
          for (let k = 0; k < this.locationShow[j][from][0]; k++) {
            for (let n = 0; n < 4; n++) {
              if (this.homeShow[j][n] == 0) {
                this.homeShow[j][n] = 1;
                break;
              }
            }
          }
          this.locationShow[j][from][0] = 0;
          return;
        }
      }
    }
  }

  move(p, pos, byprogram: Boolean = false, noClickByUser: Boolean = false) {////byprogram for after move, we use same value, used for

    if (!byprogram && !this.checkIsUser())
      return;
    if (this.lastThrowValue == 0)
      return;
    if (this.CanAcceptEnvet == false && !noClickByUser) {
      return;
    }
    if (this.pieces[this.turn] == p) {
      if (this.posCounterMove == 0) {
        this.valueMove = this.lastThrowValue;
        this.moveStartPoint = pos;
        if(!this.canMove(this.turn,pos,this.lastThrowValue)){
          return;
        }
      }
      if (this.valueMove) {
        this.nativeAudio.play('move');
        this.CanAcceptEnvet = false;
        for (let k = 0; k < this.animateCol[this.turn].length; k++) {
          this.animateCol[0][k][0] = 0;
          this.animateCol[1][k][0] = 0;
          this.animateCol[2][k][0] = 0;
          this.animateCol[3][k][0] = 0;
        }
        this.animateHome[0] = '';
        this.animateHome[1] = '';
        this.animateHome[2] = '';
        this.animateHome[3] = '';
        var start = this.posStart[this.turn];
        var end = this.posEnd[this.turn];
        if (pos == end) {
          setTimeout(() => {
            this.nativeAudio.stop('move');
            this.posCounterColored = 1;
            this.valueColored = this.valueMove - 1;
            if (this.locationShow[this.turn][pos][0])
              this.locationShow[this.turn][pos][0]--;
            this.locationShowColored[this.turn][0][0]++;

            this.posCounterMove = 0;
            this.valueMove = 0;
            this.moveColored(p, 0, byprogram, true);

          }, 350);
          return;
        }

        let nextPos = (pos + 1) % 52;
        setTimeout(() => {
          this.nativeAudio.stop('move');
          if (this.locationShow[this.turn][pos][0])
            this.locationShow[this.turn][pos][0]--;
          this.locationShow[this.turn][nextPos][0]++;
          this.move(p, nextPos, byprogram, true);
        }, 350);
        this.valueMove--;
        this.posCounterMove++;
      } else {
        this.posCounterMove = 0;
        this.CanAcceptEnvet = true;
        this.cutPiece(p, pos);
        if (this.lastThrowValue == 6) {
          this.lastThrowValue = 0;
          console.log("roll dice again");
          if (!this.checkIsUser()) {
            this.autoPlay();
          } else {
            this.rollDiceB = true;
          }
        } else {
          this.lastThrowValue = 0;
          this.nextTurn();
        }
      }
    }
    console.log("is not your turn");
  }
  botChooseMove(num: number = 0) {
    setTimeout(() => {
      if (this.lastThrowValue == 6) {
        if (this.homeLeft[this.turn] && this.locationShow[this.turn][this.posStart[this.turn]][0]<2) {
          for (let i = 0; i < 4; i++)
            if (this.homeShow[this.turn][i]) {
              setTimeout(() => {
                this.moveOut(this.pieces[this.turn], i);
              }, 700);
              break;
            }
        }
        else {
          for (let i = 0; i < 51; i++) {
            if (this.locationShow[this.turn][(this.posEnd[this.turn]-i+52)%52][0] && this.canMove(this.turn,(this.posEnd[this.turn]-i+52)%52,this.lastThrowValue)) {
              setTimeout(() => {
                this.move(this.pieces[this.turn],(this.posEnd[this.turn]-i+52)%52, true, true);
              }, 700);
              break;
            }
          }
        }
      } else {
        var colorP = 0;
        for (var i = 0; i < 5; i++) {
          colorP = colorP + this.locationShowColored[this.turn][i][0];
        }
        if (colorP)
          for (var i = 0; i < 5; i++) {
            if (this.locationShowColored[this.turn][i][0])
              if (5 == i + this.lastThrowValue) {
                setTimeout(() => {
                  this.moveColored(this.pieces[this.turn], i, true, true);
                }, 700);
                return;
              }
          }

        for (let i = 0; i < 51; i++) {
          if (this.locationShow[this.turn][(this.posEnd[this.turn]-i+52)%52][0] && this.canMove(this.turn,(this.posEnd[this.turn]-i+52)%52,this.lastThrowValue)) {
            setTimeout(() => {
              this.move(this.pieces[this.turn], (this.posEnd[this.turn]-i+52)%52, true, true);
            }, 700);
            return;
          }
        }

        this.nextTurn();
      }
    }, 300);

  }
  moveColored(p, from, call, noClickByUser: Boolean = false) {
    if (!call && !this.checkIsUser())
      return;

    if (this.CanAcceptEnvet == false && !noClickByUser) {
      return;
    }
    // if (this.CanAcceptEnvet == false && !this.checkIsUser()) {
    //   return;
    // }
    if (this.pieces[this.turn] == p) {
      if (this.posCounterColored == 0) {
        this.valueColored = this.lastThrowValue;
      }

      if (this.valueColored) {

        var value = this.valueColored;
        this.CanAcceptEnvet = false;
        if (value > (5 - from)) {
          // if(this.userNo==this.turn)
          console.log("you can not move");
          this.lastThrowValue = value;
          this.posCounterColored = 0;
          this.valueColored = 0;
          this.CanAcceptEnvet = true;
          if (!this.checkIsUser()) {
            this.previousBotmove++;
            this.botChooseMove(this.previousBotmove);
            return;
          }
          else this.rollDiceB = true;
          return 0;
        } else {

          for (let k = 0; k < this.animateCol[this.turn].length; k++) {
            this.animateCol[0][k][0] = 0;
            this.animateCol[1][k][0] = 0;
            this.animateCol[2][k][0] = 0;
            this.animateCol[3][k][0] = 0;
          }
          this.animateHome[0] = '';
          this.animateHome[1] = '';
          this.animateHome[2] = '';
          this.animateHome[3] = '';
          this.nativeAudio.play('move');

          if (from == 4) {
            setTimeout(() => {
              this.nativeAudio.stop('move');
              if (this.locationShowColored[this.turn][from][0])
                this.locationShowColored[this.turn][from][0]--;
              this.homeWon[this.turn]++;
              this.showColoredAnimation = true
              setTimeout(() => {
                this.decideShowFireworks();

                this.showColoredAnimation = false;
                this.CanAcceptEnvet = true;

                if (this.lastThrowValue == 6) {
                  this.lastThrowValue = 0;
                  if (this.checkIsUser()) {
                    this.rollDiceB = true;
                  } else {
                    this.autoPlay();
                  }
                } else {
                  this.lastThrowValue = 0;
                  this.nextTurn();
                }
              }, 1500);
            }, 350);
            this.posCounterColored = 0;
            this.valueColored = 0;
            return;

          } else {
            setTimeout(() => {
              this.nativeAudio.stop('move');
              if (this.locationShowColored[this.turn][from][0])
                this.locationShowColored[this.turn][from][0]--;
              this.locationShowColored[this.turn][from + 1][0]++;
              this.moveColored(p, from + 1, call, true);
            }, 350);
            this.posCounterColored++;
            this.valueColored--;
          }
        }
      } else {
        this.CanAcceptEnvet = true;
        this.valueColored = 0;
        this.posCounterColored = 0;
        if (this.lastThrowValue == 6) {
          this.lastThrowValue = 0;
          if (this.checkIsUser()) {
            this.rollDiceB = true;
          } else {
            setTimeout(() => {
              this.autoPlay();
            }, 350);
          }
        } else {
          this.lastThrowValue = 0;
          setTimeout(() => {
            this.nextTurn();
          }, 350);
        }
      }
    } else {
      console.log("not your turn");
    }
  }

  leaveModalShow() {
    if (!this.userFinished) {
      this.leavModal.present();
    } else {
      this.router.navigate(["/main"]);
    }
  }
  leaveTable() {
    this.leavModal.dismiss();
    this.router.navigate(["/main"]);
  }
}
