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
    const { completed, title, cursor, limit } = req.query as any;
    const q: any = {};
    if (completed !== undefined) q.completed = completed === 'true' || completed === true;
    if (title) q.title = title;
    if (cursor) q.cursor = cursor;
    if (limit) q.limit = Number(limit);
    const results = await todoService.list(q);
    res.json(results);
  }

  async get(req: Request, res: Response) {
    const id = req.params.id;
    const todo = await todoService.get(id);
    res.json(todo);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const payload = req.body as UpdateTodo;
    const updateData = {
      ...payload,
      dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined,
    };
    const todo = await todoService.update(id, updateData);
    res.json(todo);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    await todoService.delete(id);
    res.status(204).send();
  }
}

export const todoController = new TodoController();
