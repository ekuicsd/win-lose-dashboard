import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Players } from 'src/app/models/players.model';
import { ApiService } from 'src/app/shared/services/api-service.service';

@Component({
  selector: 'app-bet-page',
  templateUrl: './bet-page.component.html',
  styleUrls: ['./bet-page.component.css']
})
export class BetPageComponent implements OnInit {

  randomBetNumber = '';
  playersList: Players[] = [];

  constructor(public _apiService: ApiService,
    private _router: Router) { }

  ngOnInit() {
    if (this._apiService.selectedPlayersList.length == 0) {
      this._router.navigate(['/']);
    }
    this.randomBetNumber = Math.floor((Math.random() * 9) + 1).toString();
    this._apiService.curruntPlayersList$.subscribe(res => {
      this.playersList = res;
    });
    this.updateValues();
  }

  updateValues() {
    this._apiService.selectedPlayersList.forEach(ele => {
      let isWins = ele.Bet == this.randomBetNumber ? 1 : 0;
      let index = this.playersList.indexOf(ele);
      if (isWins == 1) {
        this.playersList[index].Wins = this.playersList[index].Wins + 1;
        ele.Wins = this.playersList[index].Wins;
        this.playersList[index].Price = (2 * Number(this.playersList[index].Price)).toString();
        ele.Price = this.playersList[index].Price;
      } else {
        this.playersList[index].Lost = this.playersList[index].Lost + 1;
        ele.Lost = this.playersList[index].Lost;
      }
    });
    this._apiService.saveUserData(this.playersList);
  }

}
