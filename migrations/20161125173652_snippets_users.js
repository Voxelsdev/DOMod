'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('snippets_users', table => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.integer('snippet_id')
      .notNullable()
      .references('id')
      .inTable('snippets')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('snippers_users');
};
