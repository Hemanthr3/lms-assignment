import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const pg = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: pg, schema });

export default db;
