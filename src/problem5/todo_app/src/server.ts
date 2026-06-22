import 'dotenv/config';
import app from './app';
import { connect } from './config/database';

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo_db';

async function start() {
  console.log(`PORT = ${PORT}`);
  console.log(`MONGODB_URI = ${MONGODB_URI}`);
  await connect(MONGODB_URI);
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
