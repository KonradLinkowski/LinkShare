import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard], children: [
    { path: '', component: DashboardComponent },
    { path: 'settings', component: SettingsComponent }
  ] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
