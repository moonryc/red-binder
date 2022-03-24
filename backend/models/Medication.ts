import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection';
import bcrypt from 'bcrypt';


class Medication extends Model {
  declare medication_id: number;
  declare user_id: number;
  declare medication_name: string;
  declare bottle_dosage_number: number;
  declare bottle_dosage_measurement:string;
  declare next_refill:Date;
  declare notes: string|null;


}

Medication.init(
  {
    medication_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    medication_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bottle_dosage_number: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bottle_dosage_measurement:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    next_refill:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {


    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'medication',
  }
);

export default Medication;
