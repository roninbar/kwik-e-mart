import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { OrderItem } from '../../order-item';

@Component({
  selector: 'app-order-items-table',
  templateUrl: './order-items-table.component.html',
  styleUrls: ['./order-items-table.component.css']
})
export class OrderItemsTableComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<OrderItem>;
  @Input() dataSource: OrderItem[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'quantity', 'price', 'total'];

  public totalItems(): number {
    return this.dataSource.reduce((sum, { quantity }) => sum + quantity, 0);
  }

  public totalPrice(): number {
    return this.dataSource.reduce((sum, { quantity, purchasePrice }) => sum + quantity * purchasePrice, 0);
  }
}
