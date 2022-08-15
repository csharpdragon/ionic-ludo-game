import { StatsService } from '../../services/stats.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {TableService} from '../../services/table.service';
import { IonModal } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  @Input() currentPage: string;
  @ViewChild(IonModal) modal: IonModal;
  title="";
  totalEvenCount;
  totalOddCount;
  canDismiss = false;

  presentingElement = null;
  constructor(public statsService: StatsService, private alertController: AlertController,private tableService: TableService,private router:Router) {}
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.title, 'confirm');
  }

  onWillDismiss(event: Event) {
  }
  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');

  }

  resetAll() {
    this.tableService.clearAll();
  }


  gotoSettings(){
    this.router.navigateByUrl("/settings")
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message:"Are you sure you want to reset all ?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.resetAll();
          },
        },
      ],
    });

    await alert.present();
  }

}
