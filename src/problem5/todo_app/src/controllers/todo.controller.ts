import { Request, Response } from 'express';
import { todoService } from '../services/todo.service';
import { CreateTodo, UpdateTodo } from '../validators/todo.validator';

export class TodoController {
  async create(req: Request, res: Response) {
    const payload = req.body as CreateTodo;
    const todo = await todoService.create({ ...payload, dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined });
    res.status(201).json(todo);
  }

  async list(req: Request, res: Response) {
    const { completed, title, page, limit } = req.query as any;
    const q: any = {};
    if (completed !== undefined) q.completed = completed === 'true' || completed === true;
    if (title) q.title = title;
    if (page) q.page = Number(page);
    if (limit) q.limit = Number(limit);
    const items = await todoService.list(q);
    res.json(items);
  }

  async get(req: Request, res: Response) {
    const id = req.params.id;
    const todo = await todoService.get(id);
    res.json(todo);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const payload = req.body as UpdateTodo;
    const todo = await todoService.update(id, payload);
    res.json(todo);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    await todoService.delete(id);
    res.status(204).send();
  }
}

export const todoController = new TodoController();
