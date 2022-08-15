import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GamePlayPage } from './game-play.page';

describe('GamePlayPage', () => {
  let component: GamePlayPage;
  let fixture: ComponentFixture<GamePlayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamePlayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
