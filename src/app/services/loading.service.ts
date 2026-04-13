import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingUserMerchantSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  $loadingUserMerchant = this.loadingUserMerchantSubject.asObservable();

  constructor() {}
}
