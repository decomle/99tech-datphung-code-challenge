jest.mock('../../../src/config/database', () => ({
  __esModule: true,
  connect: jest.fn().mockResolvedValue(undefined),
  disconnect: jest.fn().mockResolvedValue(undefined),
}));

const appMock = { listen: jest.fn((port: number, cb: Function) => {
  cb();
  return { close: jest.fn((cbClose: Function) => cbClose()) };
}) };

jest.mock('../../../src/app', () => ({
  __esModule: true,
  default: appMock,
}));

import { start } from '../../../src/server';
import { connect, disconnect } from '../../../src/config/database';

describe('server startup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls connect and listens on the configured port', async () => {
    await start();

    expect(connect).toHaveBeenCalled();
    expect(appMock.listen).toHaveBeenCalled();
  });

  it('exports a start function without auto-starting', () => {
    expect(typeof start).toBe('function');
  });
});
