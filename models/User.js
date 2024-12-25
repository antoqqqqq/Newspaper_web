import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: true },
  googleId: { type: DataTypes.STRING, unique: true, allowNull: true },
  facebookId: { type: DataTypes.STRING, unique: true, allowNull: true },
  role: { type: DataTypes.ENUM('guest', 'subscriber', 'writer', 'editor', 'admin'), defaultValue: 'guest' },
  subscription_expiration: { type: DataTypes.DATE, allowNull: true },
});

export default User;
