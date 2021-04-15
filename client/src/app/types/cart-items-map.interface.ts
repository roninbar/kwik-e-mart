import { OrderItem } from './order-item';

export interface ICartItemsMap {
    [productId: string]: OrderItem;
}
