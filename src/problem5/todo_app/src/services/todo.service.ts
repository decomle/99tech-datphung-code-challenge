import { todoRepository } from '../repositories/todo.repository';

export class TodoService {
  async create(data: { title: string; description?: string; dueDate?: Date }) {
    return todoRepository.create(data as any);
  }

  async list(query: { completed?: boolean; title?: string; page?: number; limit?: number }) {
    const filter: any = {};
    if (query.completed !== undefined) filter.completed = query.completed;
    if (query.title) filter.title = { $regex: query.title, $options: 'i' };
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 50;
    const skip = (page - 1) * limit;
    return todoRepository.findAll(filter, skip, limit);
  }

  async get(id: string) {
    const t = await todoRepository.findById(id);
    if (!t) throw new Error('NotFound');
    return t;
  }

  async update(id: string, payload: any) {
    const t = await todoRepository.update(id, payload);
    if (!t) throw new Error('NotFound');
    return t;
  }

  async delete(id: string) {
    const t = await todoRepository.delete(id);
    if (!t) throw new Error('NotFound');
    return;
  }
}

export const todoService = new TodoService();
