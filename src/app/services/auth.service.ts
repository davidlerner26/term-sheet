import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #auth = inject(Auth);
  #firestore = inject(Firestore);
  authState$ = authState(this.#auth);
  authStateWithDelay$ = this.authState$.pipe(delay(1000));
  router = inject(Router);
  route = inject(ActivatedRoute);

  redirect = false;

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => {
          let currentRoute = this.route;

          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }

          return currentRoute;
        }),
        switchMap((route) => route.data),
      )
      .subscribe((data) => {
        this.redirect = data['authOnly'] ?? false;
      });
  }

  async createUser(userData: IUser) {
    const userCred = await createUserWithEmailAndPassword(
      this.#auth,
      userData.email,
      userData.password,
    );

    await setDoc(doc(this.#firestore, 'users', userCred.user.uid), {
      name: userData.name,
      email: userData.email,
    });

    await updateProfile(userCred.user, {
      displayName: userData.name,
    });

    console.log(userCred);
  }

  async logout($event?: Event) {
    $event?.preventDefault();

    await signOut(this.#auth);

    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
