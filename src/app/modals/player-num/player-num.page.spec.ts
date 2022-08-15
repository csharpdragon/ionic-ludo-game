import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayerNumPage } from './player-num.page';

describe('PlayerNumPage', () => {
  let component: PlayerNumPage;
  let fixture: ComponentFixture<PlayerNumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerNumPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerNumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
