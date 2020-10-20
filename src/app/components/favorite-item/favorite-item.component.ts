import {Component, Input, OnInit} from '@angular/core';
import {FavoriteData} from "../../models/favorite-data";

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.css']
})
export class FavoriteItemComponent implements OnInit {

  @Input() favorite: FavoriteData;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
