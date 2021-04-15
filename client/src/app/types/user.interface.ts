export interface IUser {
    _id: string;
    role: 'customer' | 'admin';
    email: string;
    name: {
        first: string;
        last: string;
    };
    address: {
        city: string;
        street: string;
        house: number;
    };
}
