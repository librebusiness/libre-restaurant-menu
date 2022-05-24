import { Injectable } from '@angular/core';
import { Dish } from './dish';
import {
  DocumentReference,
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  query,
  setDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private path = 'dishes';

  constructor(private fs: Firestore) {}

  addDish(dish: Dish) {
    return addDoc(
      collection(this.fs, this.path),
      dish
    );
  }

  getDishes() {
    return collectionData<Dish>(
      query<Dish>(
        collection(this.fs, this.path) as CollectionReference<Dish>
      ), { idField: 'id' }
    );
  }

  getDish(id: string) {
    return docData<Dish>(
      doc(this.fs, this.path, id) as DocumentReference<Dish>
    );
  }

  updateDish(dish: Dish) {
    if (dish.id) {
      return setDoc<Dish>(
        doc(this.fs, this.path, dish.id) as DocumentReference<Dish>,
        dish
      );
    }

    return null;
  }

  deleteDish(dish: Dish) {
    if (dish.id) {
      return deleteDoc(
        doc(this.fs, this.path, dish.id) as DocumentReference<Dish>
      );
    }

    return null;
  }
}
