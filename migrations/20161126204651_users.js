'use strict';

exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('hashed_password');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.specificType('hashed_password', 'char(60)')
      .notNullable();
  });
};
