import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';


  const config: PostgresConnectionOptions = {
    type: 'postgres',
    ssl: {
      rejectUnauthorized: false
    },
    // host: 'db',
    // port: 5432,
    // "postgres://username:password@localhost/database";
    username: process.env.POSTGRES_USER || 'user',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DB || 'demo',
    url: process.env.DATABASE_URL || `postgres://user:password@postgres:5432/db`,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };

export default config;
