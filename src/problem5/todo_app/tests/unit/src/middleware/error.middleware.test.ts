import { errorHandler } from '../../../../src/middleware/error.middleware';

describe('errorHandler middleware', () => {
  it('returns 404 for NotFound errors', () => {
    const err = new Error('NotFound');
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    errorHandler(err, {} as any, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Todo not found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 500 for other errors', () => {
    const err = new Error('Something bad');
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();

    errorHandler(err, {} as any, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
