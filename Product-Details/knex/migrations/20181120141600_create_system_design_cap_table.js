
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sdcapstone', (t) => {
    t.increments('_id').primary().unique();
    t.string('name').notNullable();
    t.integer('rating');
    t.integer('reviewCount');
    t.integer('itemNum').notNullable();
    t.integer('price').notNullable();
    t.string('mainImage');
    t.json('images');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sdcapstone');
};
