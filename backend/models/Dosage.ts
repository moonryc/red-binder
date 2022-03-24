import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection';



class Dosage extends Model {
  declare dosage_id:number
  declare user_id:number;
  declare medication_id: number;
  declare dosage_amount: number;
  declare dosage_measurement: string;
  declare time_to_take:Date;
  declare daily:boolean;
  declare weekly:boolean;
  declare monthly:boolean;
  declare monday:boolean;
  declare tuesday:boolean;
  declare wednesday:boolean;
  declare thursday:boolean;
  declare friday:boolean;
  declare saturday:boolean;
  declare sunday:boolean;
}

Dosage.init(
  {
    dosage_id: {
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
    medication_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medication',
        key: 'medication_id',
      },
    },
    dosage_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dosage_measurement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time_to_take: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    daily:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    weekly:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    monthly:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    monday:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    tuesday:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    wednesday:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    thursday:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    friday:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    saturday:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    sunday:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }


  },
  {


    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dosage',
  }
);

export default Dosage;
