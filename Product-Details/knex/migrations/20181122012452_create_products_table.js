
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', function(t) {
    t.increments('_id').primary().unique();
    t.string('name').notNullable();
    t.integer('rating');
    t.integer('reviewCount');
    t.integer('itemNum').notNullable();
    t.integer('price').notNullable();
    t.string('mainImage');
    t.json('images');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .then(() => console.log('table created'))
  .catch((err) => {
    console.log(err);
    throw err
  })
  .finally(() => {
    knex.destroy();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};

// exports.config = { transaction: false };
