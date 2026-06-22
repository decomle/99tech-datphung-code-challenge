import { z } from 'zod';
import { validate } from '../../../../src/middleware/validate.middleware';

describe('validate middleware', () => {
  it('calls next when data is valid', () => {
    const schema = z.object({ title: z.string() });
    const req = { body: { title: 'Test' } } as any;
    const res = {} as any;
    const next = jest.fn();

    validate(schema, 'body')(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('returns 400 when validation fails', () => {
    const schema = z.object({ title: z.string().min(1) });
    const req = { body: { title: '' } } as any;
    const json = jest.fn();
    const res = { status: jest.fn().mockReturnValue({ json }), json: json } as any;
    const next = jest.fn();

    validate(schema, 'body')(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
