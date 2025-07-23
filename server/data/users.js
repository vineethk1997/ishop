const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin one',
    email: 'adminone@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Admin two',
    email: 'admintwo@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Admin three',
    email: 'adminthree@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

module.exports = users;