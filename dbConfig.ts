import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  // Anything inside the directory -> src -> that ends in .entity.js
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
//   migrations: ['dist/src/db/migrations/*.js'],
//   cli: {
//     migrationsDir: 'src/db/migrations',
//   },
};


export default config;