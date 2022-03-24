import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection';
import bcrypt from 'bcrypt';


class Account extends Model {
  declare account_id: number;
  declare password: string;
  declare username: string;
  declare email: string;

  async isPasswordValid(submittedPassword: string) {
    return await bcrypt.compare(submittedPassword, this.password);
  }
}

Account.init(
  {
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        //username length is greater than 4
        len: [4, 10],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //password length is greater than 4
        len: [4, 20],
      },
    },
  },
  {
    hooks: {
      // @ts-ignore
      beforeCreate: async (newUserData: Account) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // @ts-ignore
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'account',
  }
);

export default Account;
