import { Todo, ITodo } from '../models/todo.model';

export class TodoRepository {
  async create(payload: Partial<ITodo>) {
    return Todo.create(payload);
  }

  async findAll(filter = {}, skip = 0, limit = 50) {
    return Todo.find(filter).skip(skip).limit(limit).exec();
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
