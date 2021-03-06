'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('email').notNullable().unique();
    table.string('avatar_url').notNullable().unique();
    table.integer('github_id').notNullable().unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
