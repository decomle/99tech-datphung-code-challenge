jest.mock('../../../../src/services/todo.service', () => ({
  todoService: {
    create: jest.fn(),
    list: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const { todoService } = require('../../../../src/services/todo.service');
import { TodoController } from '../../../../src/controllers/todo.controller';

describe('TodoController', () => {
  const controller = new TodoController();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a todo and returns 201', async () => {
    const req = { body: { title: 'Test', description: 'desc' } } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    (todoService.create as jest.Mock).mockResolvedValue({ id: '1', title: 'Test' });

    await controller.create(req, res);

    expect(todoService.create).toHaveBeenCalledWith({ title: 'Test', description: 'desc', dueDate: undefined });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: '1', title: 'Test' });
  });

  it('lists todos using query values', async () => {
    const req = { query: { completed: 'true', title: 'search', cursor: 'abc', limit: '20' } } as any;
    const res = { json: jest.fn() } as any;
    const response = { items: [{ id: '1' }], totalCount: 1, totalPages: 1, nextCursor: 'abc' };
    (todoService.list as jest.Mock).mockResolvedValue(response);

    await controller.list(req, res);

    expect(todoService.list).toHaveBeenCalledWith({ completed: true, title: 'search', cursor: 'abc', limit: 20 });
    expect(res.json).toHaveBeenCalledWith(response);
  });

  it('gets a todo by id', async () => {
    const req = { params: { id: '123' } } as any;
    const res = { json: jest.fn() } as any;
    (todoService.get as jest.Mock).mockResolvedValue({ id: '123' });

    await controller.get(req, res);

    expect(todoService.get).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith({ id: '123' });
  });

  it('updates a todo and returns the updated record', async () => {
    const req = { params: { id: '123' }, body: { title: 'Updated' } } as any;
    const res = { json: jest.fn() } as any;
    (todoService.update as jest.Mock).mockResolvedValue({ id: '123', title: 'Updated' });

    await controller.update(req, res);

    expect(todoService.update).toHaveBeenCalledWith('123', { title: 'Updated' });
    expect(res.json).toHaveBeenCalledWith({ id: '123', title: 'Updated' });
  });

  it('deletes a todo and returns 204', async () => {
    const req = { params: { id: '123' } } as any;
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any;
    (todoService.delete as jest.Mock).mockResolvedValue(true);

    await controller.delete(req, res);

    expect(todoService.delete).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
