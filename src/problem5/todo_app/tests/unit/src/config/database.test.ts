jest.mock('mongoose', () => ({
  __esModule: true,
  default: {
    connect: jest.fn(),
    disconnect: jest.fn(),
  },
}));

const mongoose = require('mongoose');
import { connect, disconnect } from '../../../../src/config/database';

describe('config/database', () => {
  it('connect calls mongoose.connect with the correct URI', async () => {
    await connect('mongodb://localhost:27017/todo_db');
    expect(mongoose.default.connect).toHaveBeenCalledWith('mongodb://localhost:27017/todo_db');
  });

  it('disconnect calls mongoose.disconnect', async () => {
    await disconnect();
    expect(mongoose.default.disconnect).toHaveBeenCalled();
  });
});
