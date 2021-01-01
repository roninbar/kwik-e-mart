import { IProduct } from './product';

export class OrderItem {
    constructor(
        public product: IProduct,
        public quantity: number,
        public purchasePrice: number,
    ) { }
}
