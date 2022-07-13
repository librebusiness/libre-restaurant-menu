import { Component, OnInit } from '@angular/core';
import { Dish } from '../dish';
import { Observable } from 'rxjs';
import { addDoc, query, collection, collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Observable<Dish[]>;
  dishCollection: CollectionReference<Dish>;

  constructor(
    private firestore: Firestore,
  ) {
    this.dishCollection = collection(this.firestore, 'dishes') as CollectionReference<Dish>;
    this.dishes = collectionData<Dish>(query<Dish>(this.dishCollection), { idField: 'id' });
  }

  ngOnInit(): void {
  }

}
