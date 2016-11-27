
exports.seed = knex => {
  return knex('').del()
  .then(() => {
    return knex('users').insert([{
      id: 1,
      email: 'jkrowling@hp.com',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    }, {
      id: 2,
      email: 'tyler@test.com',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    }, {
      id: 3,
      email: 'saralyn@test.com',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
    );
  });
};
