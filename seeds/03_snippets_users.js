
exports.seed = function(knex) {
  return knex('snippets_users').del()
  .then(() => {
    return knex('snippets_users').insert([{
      id: 1,
      user_id: 1,
      snippet_id: 1,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    }, {
      id: 2,
      user_id: 2,
      snippet_id: 1,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    }, {
      id: 3,
      user_id: 3,
      snippet_id: 3,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('snippets_users_id_seq', (SELECT MAX(id) FROM snippets_users));"
    );
  });
};
