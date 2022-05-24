import { Component, OnInit } from '@angular/core';
import { Dish } from '../dish';
import { Observable } from 'rxjs';
import { addDoc, query, collection, collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Auth, authState, User } from '@angular/fire/auth';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.scss']
})
export class DishListComponent implements OnInit {

  dishes: Observable<Dish[]>;
  dishCollection: CollectionReference<Dish>;
  dishForm = this.fb.group({
    name: [''],
    description: [''],
    price: [0],
  });
  user$: Observable<User | null>;

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder,
    private auth: Auth,
  ) {
    this.user$ = authState(this.auth);
    this.dishCollection = collection(this.firestore, 'dishes') as CollectionReference<Dish>;
    this.dishes = collectionData<Dish>(query<Dish>(this.dishCollection), { idField: 'id' });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    addDoc(this.dishCollection, this.dishForm.value);
  }

}
