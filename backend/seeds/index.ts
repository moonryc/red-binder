import dotenv from 'dotenv';

dotenv.config();
// dotenv.config({ path: '../.env' });
import sequelize from '../config/connection';
import seedUser from './user-seeds';
import seedAccount from './account-seeds';
import seedMedication from './medication-seeds';
import seedDosages from './dosage-seeds';


const statusUpdate = (message: string | any) => {
  console.log('======================');
  console.log(message);
  console.log('======================');
};

const seedAll = async () => {
  try{
    await sequelize.sync({ force: true });
    statusUpdate('DATABASE SYNCED');
    await seedAccount();
    statusUpdate('ACCOUNTS SEEDED');
    await seedUser();
    statusUpdate('USERS SEEDED');
    await seedMedication()
    statusUpdate('MEDICATION SEEDED');
    await seedDosages();
    statusUpdate('DOSAGES SEEDED');
    statusUpdate('EVERYTHING HAS BEEN SEEDED SUCCESSFULLY');
  }catch (e) {
    statusUpdate(e)
  }

  process.exit(0);

};

try {
  (async () => {
    await seedAll();
  })();
} catch (e) {
  statusUpdate(e);
}
