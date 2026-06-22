import 'dotenv/config';
import app from './app';
import { connect, disconnect } from './config/database';

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_db';

export async function start() {
  console.log(`PORT = ${PORT}`);
  console.log(`MONGODB_URI = ${MONGODB_URI}`);
  await connect(MONGODB_URI);
  const server = app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

  const shutdown = async () => {
    console.log('Shutdown signal received, closing server...');

    server.close(async (err) => {
      if (err) {
        console.error('Error closing server:', err);
      } else {
        console.log('Server closed.');
      }

      try {
        await disconnect();
        console.log('Database connection closed.');
      } catch (dbErr) {
        console.error('Error closing database connection:', dbErr);
      }
    });
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
}

if (require.main === module) {
  start().catch((err) => {
    console.error('Failed to start server', err);
    process.exit(1);
  });
}
