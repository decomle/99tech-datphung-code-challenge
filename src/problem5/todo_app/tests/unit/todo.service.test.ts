import { TodoService } from '../../src/services/todo.service';

jest.mock('../../src/repositories/todo.repository', () => ({
  todoRepository: {
    findAll: jest.fn().mockResolvedValue([]),
  },
}));

describe('TodoService (unit)', () => {
  it('list returns array (mocked)', async () => {
    const svc = new TodoService();
    await expect(svc.list({})).resolves.toEqual([]);
  });
});
