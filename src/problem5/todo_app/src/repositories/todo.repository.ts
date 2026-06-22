import { Types } from 'mongoose';
import { Todo, ITodo } from '../models/todo.model';

export class TodoRepository {
  async create(payload: Partial<ITodo>) {
    return Todo.create(payload);
  }

  async findAll(filter = {}, limit = 50, cursor?: string) {
    const query = Todo.find(filter).sort({ _id: 1 });
    if (cursor) {
      query.find({ _id: { $gt: new Types.ObjectId(cursor) } });
    }
    return query.limit(limit).exec();
  }

  async count(filter = {}) {
    return Todo.countDocuments(filter).exec();
  }

  async findById(id: string) {
    return Todo.findById(id).exec();
  }

  async update(id: string, payload: Partial<ITodo>) {
    return Todo.findByIdAndUpdate(id, payload, { new: true }).exec();
  }

  async delete(id: string) {
    return Todo.findByIdAndDelete(id).exec();
  }
}

export const todoRepository = new TodoRepository();
