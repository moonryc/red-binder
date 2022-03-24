//ENV variables
import dotenv from 'dotenv'
dotenv.config()
//1st party
import sequelize from '../config/connection';
import routes from '../routes'
//3rd PArty
import express from 'express';
import cors from 'cors'
//TODO convert to ESM
import logger from 'morgan';


const PORT = process.env.PORT || 3002;
const app = express();


sequelize.sync({force:false}).then(()=>{
  app.listen(PORT,()=>{
      console.log(`🚀  Server ready at ${PORT}`);
  })
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(logger('dev'));

app.use(routes)