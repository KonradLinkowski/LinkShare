import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as firebase from 'firebase/app';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

firebase.initializeApp({
  apiKey: "AIzaSyAyjOGVsKWcX_zeaeuChwBBo6e_QeKq4LM",
  authDomain: "linkshare-ec755.firebaseapp.com",
  databaseURL: "https://linkshare-ec755.firebaseio.com",
  projectId: "linkshare-ec755",
  storageBucket: "linkshare-ec755.appspot.com",
  messagingSenderId: "674524310907"
});
