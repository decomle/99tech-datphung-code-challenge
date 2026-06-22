import { Todo } from '../../../../src/models/todo.model';

describe('Todo model', () => {
  it('uses the Todo name and schema fields', () => {
    expect(Todo.modelName).toBe('Todo');
    expect(Todo.schema.path('title')).toBeDefined();
    expect(Todo.schema.path('description')).toBeDefined();
    expect(Todo.schema.path('completed')).toBeDefined();
    expect(Todo.schema.path('dueDate')).toBeDefined();
  });
});
