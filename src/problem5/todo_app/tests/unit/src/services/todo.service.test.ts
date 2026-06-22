import { TodoService } from '../../../../src/services/todo.service';

jest.mock('../../../../src/repositories/todo.repository', () => ({
  todoRepository: {
    create: jest.fn(),
    findAll: jest.fn(),
    count: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const { todoRepository } = require('../../../../src/repositories/todo.repository');

describe('TodoService (unit)', () => {
  const svc = new TodoService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('create forwards payload to repository', async () => {
    const todo = { title: 'Test todo', description: 'desc' };
    (todoRepository.create as jest.Mock).mockResolvedValue({ id: '1', ...todo });

    await expect(svc.create(todo)).resolves.toEqual({ id: '1', ...todo });
    expect(todoRepository.create).toHaveBeenCalledWith(todo);
  });

  it('list builds filter and cursor pagination', async () => {
    const expectedItems = [{ _id: '640000000000000000000001', id: '1', title: 'hi', completed: true }];
    (todoRepository.findAll as jest.Mock).mockResolvedValue(expectedItems);
    (todoRepository.count as jest.Mock).mockResolvedValue(15);

    await expect(svc.list({ completed: true, title: 'hi', cursor: '640000000000000000000000', limit: 10 })).resolves.toEqual({
      items: expectedItems,
      totalCount: 15,
      totalPages: 2,
      nextCursor: '640000000000000000000001',
    });
    expect(todoRepository.findAll).toHaveBeenCalledWith(
      { completed: true, title: { $regex: 'hi', $options: 'i' } },
      10,
      '640000000000000000000000',
    );
    expect(todoRepository.count).toHaveBeenCalledWith({ completed: true, title: { $regex: 'hi', $options: 'i' } });
  });

  it('list uses default pagination values', async () => {
    const expectedItems = [{ _id: '640000000000000000000001', id: '2', title: 'hello' }];
    (todoRepository.findAll as jest.Mock).mockResolvedValue(expectedItems);
    (todoRepository.count as jest.Mock).mockResolvedValue(15);

    await expect(svc.list({})).resolves.toEqual({
      items: expectedItems,
      totalCount: 15,
      totalPages: 2,
      nextCursor: '640000000000000000000001',
    });
    expect(todoRepository.findAll).toHaveBeenCalledWith({}, 10, undefined);
    expect(todoRepository.count).toHaveBeenCalledWith({});
  });

  it('get returns a todo when found', async () => {
    const item = { id: '123', title: 'found' };
    (todoRepository.findById as jest.Mock).mockResolvedValue(item);

    await expect(svc.get('123')).resolves.toEqual(item);
    expect(todoRepository.findById).toHaveBeenCalledWith('123');
  });

  it('get throws when todo not found', async () => {
    (todoRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(svc.get('123')).rejects.toThrow('NotFound');
  });

  it('update returns updated todo when found', async () => {
    const updated = { id: '123', title: 'updated' };
    (todoRepository.update as jest.Mock).mockResolvedValue(updated);

    await expect(svc.update('123', { title: 'updated' })).resolves.toEqual(updated);
    expect(todoRepository.update).toHaveBeenCalledWith('123', { title: 'updated' });
  });

  it('update throws when todo not found', async () => {
    (todoRepository.update as jest.Mock).mockResolvedValue(null);

    await expect(svc.update('123', { title: 'updated' })).rejects.toThrow('NotFound');
  });

  it('delete resolves when todo is deleted', async () => {
    (todoRepository.delete as jest.Mock).mockResolvedValue(true);

    await expect(svc.delete('123')).resolves.toBeUndefined();
    expect(todoRepository.delete).toHaveBeenCalledWith('123');
  });

  it('delete throws when todo not found', async () => {
    (todoRepository.delete as jest.Mock).mockResolvedValue(null);

    await expect(svc.delete('123')).rejects.toThrow('NotFound');
  });
});
