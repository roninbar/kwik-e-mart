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
            last4: string;
        };
    };
    products: {
        id: string;
        quantity: number;
    }[];
}
