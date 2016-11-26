'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('snippets', table => {
    table.increments();
    table.text('html').notNullable().defaultTo('<!doctype html>');
    table.text('javascript').notNullable().defaultTo('console.log("Hello world!")');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('snippets');
};
