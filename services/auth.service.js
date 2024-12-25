const bcrypt = require('bcrypt');
const pool = require('../config/db');

const authService = {
  async getAllUsers() {
    const [users] = await pool.query('SELECT * FROM users');
    return users;
  },
  
};

module.exports = authService;
