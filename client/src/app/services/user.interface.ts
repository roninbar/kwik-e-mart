export interface IUser {
    _id: string;
    role: string /* 'user' | 'admin' */;
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
