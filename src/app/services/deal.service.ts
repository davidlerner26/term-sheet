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

  async addDeal(dealData: IDeal) {
    const { dealName, price, address, noi, capRate } = dealData;
    const id = Math.random().toString(36).slice(2, 10);
    await setDoc(doc(this.firestore, this.DEALS_COLLECTION, id), {
      id,
      dealName,
      price,
      address,
      noi,
      capRate,
    });
  }
}
