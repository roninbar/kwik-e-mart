import { IProduct } from './product.interface';

export class OrderItem {
    constructor(
        public product: IProduct,
        public quantity: number,
        public purchasePrice: number,
    ) { }
}
