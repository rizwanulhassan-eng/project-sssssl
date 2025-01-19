import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BusSeatingComponent } from './bus-seating/bus-seating.component';

const routes: Routes = [
 
  {path:'', component: LandingPageComponent, pathMatch: 'full'},
  { path: 'bus/:id', component: BusSeatingComponent },
  { path: 'admin', redirectTo: '/?admin=true', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
