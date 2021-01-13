import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _apiService: ApiService) {
  }

  ngOnInit() {
    this._apiService.getUserData();
  }

  title = 'leader-board';
}
