import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User, Topic, Comment } from './models';
// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
//   process.env;

// CLIENT_PORT=3000
// SERVER_PORT=3001
// POSTGRES_USER=postgres
// POSTGRES_PASSWORD=324334aa
// POSTGRES_DB=postgres
// POSTGRES_PORT=5432

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(5432),
  username: 'postgres',
  password: '324334aa',
  database: 'postgres',
  dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql'
};

export const sequelize = new Sequelize(sequelizeOptions);
sequelize.addModels([User, Topic, Comment]);

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных
    // { alter: true, force: true }
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
