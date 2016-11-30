
exports.seed = function(knex) {
  return knex('users').del()
  .then(() => {
    return knex('users').insert([{
      id: 1,
      email: 'jkrowling@hp.com',
      avatar_url: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    }, {
      id: 2,
      email: 'tyler@test.com',
      avatar_url: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    }, {
      id: 3,
      email: 'saralyn@test.com',
      avatar_url: 'http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png',
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
