import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyClgK_jEJiHC2m-HG53NCIGDgurEo0x28I',
        authDomain: 'term-sheet-4f124.firebaseapp.com',
        projectId: 'term-sheet-4f124',
        storageBucket: 'term-sheet-4f124.firebasestorage.app',
        messagingSenderId: '672472853162',
        appId: '1:672472853162:web:d91d4f06cc3102ce767ed3',
        measurementId: 'G-LZM2Y1DZ7N',
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
