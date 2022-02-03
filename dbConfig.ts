import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';


  const config: PostgresConnectionOptions = {
    type: 'postgres',
    // host: 'db',
    // port: 5432,
    // username: 'user',
    // password: 'password',
    // database: 'demo',
    // "postgres://username:password@localhost/database";
    // url: `postgres://user:password@postgres:5432/db`,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };

export default config;
