
exports.seed = function(knex) {
  return knex('snippets').del()
  .then(() => {
    return knex('snippets').insert([{
      id: 1,
      html: '<!doctype html>',
      javascript: 'console.log("Hello world!")',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    }, {
      id: 2,
      html: '<!doctype html>',
      javascript: 'console.log("Hello world 2!")',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    }, {
      id: 3,
      html: '<!doctype html>',
      javascript: 'console.log("Hello world 3!")',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    }]);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('snippets_id_seq', (SELECT MAX(id) FROM snippets));"
    );
  });
};
