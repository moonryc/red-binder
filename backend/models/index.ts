import Account from './Account';
import Medication from './Medication';
import User from './User';
import Dosage from './Dosage';

//create associations below
Account.hasMany(User, {
  foreignKey: 'account_id',
  onDelete: 'cascade',
});

User.belongsTo(Account,{
  foreignKey: 'account_id',
})

User.hasMany(Medication,{
  foreignKey: 'user_id',
  onDelete:'cascade'
})

Medication.belongsTo(User,{
  foreignKey: 'user_id',
})

Medication.hasMany(Dosage,{
  foreignKey: 'medication_id',
  onDelete:'cascade'
})

Dosage.belongsTo(Medication,{
  foreignKey:'medication_id'
})

User.hasMany(Dosage,{
  foreignKey:'user_id',
  onDelete:'cascade'
})

Dosage.belongsTo(User,{
  foreignKey:'user_id'
})

export { Account,User,Medication,Dosage };
