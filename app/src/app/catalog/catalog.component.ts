import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { ActionResult } from '../api/models';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private itemService: ItemService) { this.getItems();}

  ngOnInit(): void {
  }

  itemList : Item[] = [ ];

  // method to get items
  getItems() {
    this.itemService.getItems().subscribe({
               next: (result: ActionResult) => {
                this.itemList = result.data as Item[];
               },
               error: (err) => {
                 console.error('Error fetching items:', err);
               }
             });
  }
}
