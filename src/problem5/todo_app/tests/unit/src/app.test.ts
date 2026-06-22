import app from '../../../src/app';

describe('app module', () => {
  it('exposes an Express application', () => {
    expect(app).toBeDefined();
    expect(typeof app.use).toBe('function');
  });

  it('mounts the todos router', () => {
    const routerLayer = app._router.stack.find((layer: any) => layer.name === 'router');
    expect(routerLayer).toBeDefined();
  });

  it('registers the error handler middleware', () => {
    const errorLayer = app._router.stack.find((layer: any) => layer.name === 'errorHandler');
    expect(errorLayer).toBeDefined();
  });
});
