export interface Service {
  _id: string;
  name: string;
  price: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  _id: string;
  phone: string;
  password: string;
  name: string;
  token: string;
}
export type Customer = {
  _id: string;
  phone: string;
  name: string;
  loyalty: string;
  totalSpent: number;
  updatedAt: Date;
  updatedBy: string;
};

export type Transaction = {
  _id: string;
  id: string;
  customer: Customer;
  services: (Service & { quantity: number })[];
  priceBeforePromotion: number;
  price: number;
  createdBy: User;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CustomerDetail = Customer & { transactions: Transaction[] };
