const path = require('path'),
      controller = require( path.join(__dirname, '../controllers/users.js') );

module.exports = [
  {
    method: 'POST',
    path: '/user',
    handler: controller.create
  },
  {
    method: 'GET',
    path: '/user',
    handler: controller.get
  }
]
