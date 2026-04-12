import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  getDocs,
  collection,
} from '@angular/fire/firestore';
import IDeal from '../models/deal.model';

@Injectable({
  providedIn: 'root',
})
export class DealService {
  DEALS_COLLECTION = 'deals';

  constructor(private firestore: Firestore) {}

  async getDeals(): Promise<IDeal[]> {
    const querySnapshot = await getDocs(
      collection(this.firestore, this.DEALS_COLLECTION),
    );
    const docs: IDeal[] = [];
    querySnapshot.forEach((doc) => {
      docs.push(doc.data() as IDeal);
    });
    return docs;
  }

  async addDeal() {
    await setDoc(doc(this.firestore, this.DEALS_COLLECTION, '1'), {
      id: 1,
      dealName: 'Deal Name',
      price: '1.25',
      address: 'Golf Channel DrOrlando, FL 32819, EUA',
      noi: '125',
      capRate: '1',
    });
  }
}
