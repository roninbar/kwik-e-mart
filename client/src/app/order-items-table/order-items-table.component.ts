import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CartService } from '../cart.service';
import { OrderItem } from '../order-item';

@Component({
  selector: 'app-order-items-table',
  templateUrl: './order-items-table.component.html',
  styleUrls: ['./order-items-table.component.css']
})
export class OrderItemsTableComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<OrderItem>;
  dataSource: OrderItem[] = this.cartService.getAllItems();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'qty', 'price', 'total'];

  constructor(private cartService: CartService) { }
}
