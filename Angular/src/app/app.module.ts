import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LinkComponent } from './link/link.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { MainComponent } from './main/main.component';
import { LinkAddComponent } from './link-add/link-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinkFolderComponent } from './link-folder/link-folder.component';
import { FolderAddComponent } from './folder-add/folder-add.component';
import { FolderShareComponent } from './folder-share/folder-share.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LinkComponent,
    NavbarComponent,
    SettingsComponent,
    MainComponent,
    LinkAddComponent,
    LinkFolderComponent,
    FolderAddComponent,
    FolderShareComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
