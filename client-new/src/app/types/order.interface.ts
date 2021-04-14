import { IProduct } from './product.interface';

export interface IOrder {
    _id: string;
    createdAt: string;
    customer: {
        _id: string;
        address: {
            city: string;
            house: number;
            street: string;
        };
        name: {
            first: string;
            last: string;
        };
        username: string;
    };
    delivery: {
        on: string;
        to: {
            city: string;
            house: number;
            street: string;
        };
    };
    payment: {
        cc: {
            number: string;
        };
    };
    items: {
        product: IProduct;
        quantity: number;
        purchasePrice: number;
    }[];
    total: string;
    receiptUrl: string;
}
