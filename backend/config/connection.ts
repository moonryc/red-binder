import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();


let sequelize: any;

//create connection to the db
if (process.env.JAWSDB_URL) {
  console.log('using jaws');
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    logging: process.env.SEQUELIZE_LOGGING === 'true',
  });
} else {
  console.log('using local');
  console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW);
  sequelize = new Sequelize(
    <string>process.env.DB_NAME,
    <string>process.env.DB_USER,
    <string>process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: process.env.SEQUELIZE_LOGGING === 'true',
    }
  );
}

export default sequelize;
