import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyBnFDVY292hPJ-J63CFROOSRWuGc6M3IAs',
  authDomain: 'pingpongapp-7b948.firebaseapp.com',
  projectId: 'pingpongapp-7b948',
  storageBucket: 'pingpongapp-7b948.appspot.com',
  messagingSenderId: '374079902293',
  appId: '1:374079902293:web:0bd1ad56681324f9af7adc',
  databaseURL: 'https://pingpongapp-7b948-default-rtdb.firebaseio.com',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      BrowserAnimationsModule,
    ]),
    MessageService,
  ],
};
