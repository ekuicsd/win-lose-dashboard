import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BetPageComponent } from './components/bet-page/bet-page.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/leaderBoard', pathMatch: 'full'
  }, 
  {
    path: 'leaderBoard', component: LeaderBoardComponent
  },
  {
    path: 'bet', component: BetPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
