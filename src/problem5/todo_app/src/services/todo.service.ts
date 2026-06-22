import { todoRepository } from '../repositories/todo.repository';
import { UpdateTodo } from '../validators/todo.validator';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

type TodoUpdatePayload = Omit<UpdateTodo, 'dueDate'> & { dueDate?: Date };

export class TodoService {
  async create(data: { title: string; description?: string; dueDate?: Date }) {
    return todoRepository.create(data as any);
  }

  async list(query: { completed?: boolean; title?: string; cursor?: string; limit?: number }) {
    const filter: any = {};
    if (query.completed !== undefined) filter.completed = query.completed;
    if (query.title) filter.title = { $regex: query.title, $options: 'i' };

    const limit = query.limit && query.limit > 0 ? Math.min(query.limit, MAX_LIMIT) : DEFAULT_LIMIT;
    const items = await todoRepository.findAll(filter, limit, query.cursor);
    const totalCount = await todoRepository.count(filter);
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const nextCursor = items.length ? items[items.length - 1]._id.toString() : undefined;

    return {
      items,
      totalCount,
      totalPages,
      nextCursor,
    };
  }

  async get(id: string) {
    const t = await todoRepository.findById(id);
    if (!t) throw new Error('NotFound');
    return t;
  }

  async update(id: string, payload: TodoUpdatePayload) {
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
