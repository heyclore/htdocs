
exports.up = function(knex) {
  return knex.schema.createTable('user', tbl => {
    tbl.increments()
    tbl.text('username',64).notNullable()
    tbl.text('email',64).notNullable()
    tbl.text('password',64).notNullable()
    tbl.timestamps(true,true)
  })
  .createTable('post', tbl => {
    tbl.increments()
    tbl.text('quotes',255).notNullable()
    tbl.text('author',255).notNullable()
    tbl.timestamps(true,true)
    tbl.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('user')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('msg').dropTableIfExists('post');
  knex.schema.dropTableIfExists('msg').dropTableIfExists('user');
  return
};
