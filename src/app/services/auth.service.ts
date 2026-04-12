import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$ = authState(this.auth);

  redirect = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: Auth,
    private firestore: Firestore,
  ) {
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
      this.auth,
      userData.email,
      userData.password,
    );

    await setDoc(doc(this.firestore, 'users', userCred.user.uid), {
      name: userData.name,
      email: userData.email,
    });

    await updateProfile(userCred.user, {
      displayName: userData.name,
    });

    console.log(userCred);
  }

  async logout() {
    await signOut(this.auth);

    if (this.redirect) {
      await this.router.navigateByUrl('/auth');
    }
  }
}
