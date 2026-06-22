import router from '../../../../src/routes/todo.routes';

describe('todo.routes', () => {
  it('defines all expected routes', () => {
    const routes = router.stack.filter((layer: any) => layer.route).map((layer: any) => ({ path: layer.route.path, methods: Object.keys(layer.route.methods) }));
    expect(routes).toEqual(
      expect.arrayContaining([
        { path: '/', methods: expect.arrayContaining(['post']) },
        { path: '/', methods: expect.arrayContaining(['get']) },
        { path: '/:id', methods: expect.arrayContaining(['get']) },
        { path: '/:id', methods: expect.arrayContaining(['put']) },
        { path: '/:id', methods: expect.arrayContaining(['delete']) },
      ]),
    );
  });
});
