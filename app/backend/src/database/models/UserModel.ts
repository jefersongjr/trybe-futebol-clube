import { Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class User extends Model {
  declare id: number;

  declare username: string;

  declare role: string;

  declare email: string;

  declare password: string;}

User.init({
  id: {
    type: 'INTEGER',
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: 'STRING',
    allowNull: false,
  },
  email: {
    type: 'STRING',
    allowNull: false,
  },
  password: {
    type: 'STRING',
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default User;