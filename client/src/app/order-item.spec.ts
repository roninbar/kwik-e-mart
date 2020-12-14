import { OrderItem } from './order-item';

describe('OrderItem', () => {
  it('should create an instance', () => {
    expect(new OrderItem('5fd1442a70c889556c41abd0', 'Tuna', 1)).toBeTruthy();
  });
});
