'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('snippets', table => {
    table.increments();
    table.string()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('snippets');
};
