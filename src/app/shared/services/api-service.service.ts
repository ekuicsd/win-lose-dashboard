import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";
import { Players } from "src/app/models/players.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  private PlayersList: any = [];
  private curruntUserSubject$: BehaviorSubject<Players[]> = new BehaviorSubject<Players[]>([] as Players[]);
  readonly curruntPlayersList$ = this.curruntUserSubject$.asObservable();
  selectedPlayersList: Players[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  getUserData() {
    return this.http.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json").subscribe(res => {
      this.PlayersList = res;
      this.PlayersList.forEach(ele => {
        ele['Wins'] = 0;
        ele['Lost'] = 0;
      })
      this.curruntUserSubject$.next(this.PlayersList as Players[]);
    });
  }

  saveUserData(list: Players[]) {
    this.curruntUserSubject$.next(list);
  }

}