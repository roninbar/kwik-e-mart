import { OrderItem } from './order-item';

export interface CartItemsMap {
    [productId: string]: OrderItem;
}
