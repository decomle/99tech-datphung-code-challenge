import { createTodoSchema, updateTodoSchema } from '../../../../src/validators/todo.validator';

describe('todo.validator', () => {
  it('allows a valid create todo payload', () => {
    expect(createTodoSchema.parse({ title: 'Task 1' })).toEqual({ title: 'Task 1' });
  });

  it('rejects empty title on create', () => {
    expect(() => createTodoSchema.parse({ title: '' })).toThrow();
  });

  it('allows partial update payload', () => {
    expect(updateTodoSchema.parse({ completed: true })).toEqual({ completed: true });
  });
});
