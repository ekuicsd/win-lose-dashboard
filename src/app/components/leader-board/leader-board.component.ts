import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Players } from 'src/app/models/players.model';
import { ApiService } from 'src/app/shared/services/api-service.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  PlayersList: Players[] = [];
  searchByName: string = '';
  sortBy: string = 'Price Desc';
  page = 1;
  pageSize = 10;

  constructor(public _apiService: ApiService,
    config: NgbPaginationConfig,
    private _router: Router) {
    config.size = 'sm';
    config.boundaryLinks = true;
  }

  ngOnInit() {
    this._apiService.selectedPlayersList = [];
    this._apiService.curruntPlayersList$.subscribe(res => {
      this.PlayersList = res;
      this.PlayersList.sort((a, b) => (Number(a.Price) < Number(b.Price)) ? 1 : ((Number(b.Price) < Number(a.Price)) ? -1 : 0));
      console.log(this.PlayersList);
    });
  }

  navigateToBetPage() {
    if (this._apiService.selectedPlayersList.length !== 9) {
      alert("Selected Players should be 9.");
    } else {
      this._router.navigate(['/bet']);
    }
  }

  addToSelectedList(data, item) {
    let isChecked = data.target.checked;
    if (isChecked) {
      this._apiService.selectedPlayersList.push(item);
    }
    if (!isChecked) {
      let index = this._apiService.selectedPlayersList.indexOf(item);
      if (index !== -1) {
        this._apiService.selectedPlayersList.splice(index, 1);
      }
    }
    console.log(this._apiService.selectedPlayersList);
  }

  changeSorting(data) {
    console.log(data.target.value);
    this.sortBy = data.target.value;
    if (this.sortBy == 'Price Desc') {
      this.PlayersList.sort((a, b) => (Number(a.Price) < Number(b.Price)) ? 1 : ((Number(b.Price) < Number(a.Price)) ? -1 : 0));
    } else if (this.sortBy == 'Price Asc') {
      this.PlayersList.sort((a, b) => (Number(a.Price) > Number(b.Price)) ? 1 : ((Number(b.Price) > Number(a.Price)) ? -1 : 0));
    } else if (this.sortBy == 'Bet Asc') {
      this.PlayersList.sort((a, b) => (Number(a.Bet) > Number(b.Bet)) ? 1 : ((Number(b.Bet) > Number(a.Bet)) ? -1 : 0));
    } else if (this.sortBy == 'Bet Desc') {
      this.PlayersList.sort((a, b) => (Number(a.Bet) < Number(b.Bet)) ? 1 : ((Number(b.Bet) < Number(a.Bet)) ? -1 : 0));
    }
  }


}

