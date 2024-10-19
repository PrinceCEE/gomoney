import { Document } from "mongoose";

export class BaseEntity extends Document {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  static create<T extends BaseEntity>(entityClass: { new (): T }, data: Partial<T>): T {
    const entity = new entityClass();

    for (const key in data) {
      entity[key] = data[key]!;
    }

    return entity;
  }
}
