import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../dish';

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss']
})
export class DishItemComponent implements OnInit {

  @Input('dish') dish: Dish | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
