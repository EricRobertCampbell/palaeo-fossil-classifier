import { Sequelize } from 'sequelize';
import {
  DATABASE_DIALECT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_LOGGING_ENABLED,
  DATABASE_STORAGE,
} from './settings';
import { Dialect } from 'sequelize';

const regex = /\): (\w+)(?: FROM|.*?)"([^"]*)/i
const logging = (sql: string, timingMs?: number) => {
  const matches = sql.match(regex);
  if (matches) {
    console.log(`${matches?.[1]} ${matches?.[2]} - [Execution time: ${timingMs}ms]`);
    // if (matches[1] === 'UPDATE') {
    //   console.log(sql);
    // }
  } else {
    console.log(sql);
  }

}
console.log('DATABASE_DIALECT', DATABASE_DIALECT, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST);

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT as Dialect,
  storage: DATABASE_STORAGE,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    underscored: true,
  },
  logging: false,
  // logging: DATABASE_LOGGING_ENABLED ? console.log : false,
  // logging,
  // benchmark: true,
});

export default sequelize;
