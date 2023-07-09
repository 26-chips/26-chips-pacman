import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User, Topic, Comment } from './models';
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env;

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
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
