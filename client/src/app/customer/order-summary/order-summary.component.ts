import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { OrderItem } from 'src/app/types/order-item';

const Q = 'q';

@Component({
  selector: 'kwik-e-mart-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<OrderItem>;
  @Input() dataSource!: OrderItem[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public readonly displayedColumns = ['name', 'quantity', 'price', 'total'];

  public readonly matchingItemIds$ = this.route.queryParamMap.pipe(
    map((queryParamMap) =>
      this.cartService
        .getAllItems()
        .filter(
          ({ product: { name } }) =>
            queryParamMap.has(Q) &&
            name
              .toLowerCase()
              .includes(queryParamMap.get(Q)?.toLowerCase() || '')
        )
        .map(({ product: { _id } }) => _id)
    )
  );

  public constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  public doesMatchRx(productId: string): Observable<boolean> {
    return this.matchingItemIds$.pipe(
      map(ids => ids.includes(productId))
    );
  }

  public totalQuantity(): number {
    return this.dataSource.reduce((sum, { quantity }) => sum + quantity, 0);
  }

  public totalPrice(): number {
    return this.dataSource.reduce(
      (sum, { quantity, purchasePrice }) => sum + quantity * purchasePrice,
      0
    );
  }
}