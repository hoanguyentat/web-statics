import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticWeekComponent } from './static-week/static-week.component';
import { StaticDayComponent } from './static-day/static-day.component';

const routes: Routes = [
  {path: '' , redirectTo: '/static-week', pathMatch: 'full'},
  {path: 'static-week', component: StaticWeekComponent},
  {path: 'static-day', component: StaticDayComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
