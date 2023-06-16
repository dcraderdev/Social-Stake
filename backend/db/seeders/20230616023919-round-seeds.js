'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = { 
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Rounds';
    return queryInterface.bulkInsert(options, [
      {
        tableId: 'e10d8de4-f4c2-4d28-9324-56aa9c920801',
        active: false,
      },
      {
        tableId: 'e10d8de4-f4c2-4d28-9324-56aa9c920801',
        active: false,
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Rounds';
    return queryInterface.bulkDelete(options, {});
  }
};
