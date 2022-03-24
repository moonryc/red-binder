import { User } from '../models';


const userData = [
  {
    account_id: 1,
    name: 'john@beatles.com',
    color: 'red',
  },
  {
    account_id: 1,
    name: 'paul@beatles.com',
    color: 'red',
  },
  {
    account_id: 2,
    name: 'ringo@beatles.com',
    color: 'red',
  },
  {
    account_id: 3,
    name: 'george@beatles.com',
    color: 'red',
  },
  {
    account_id: 4,
    name: 'yoko@beatles.com',
    color: 'red',
  },
];

const seedUser = () => User.bulkCreate(userData);

export default seedUser;
