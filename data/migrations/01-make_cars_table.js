exports.up = async function (knex) {
  await knex.schema.createTable('cars', table => {
    table.increments()
    table.text('vin', 50).unique().notNullable()
    table.text('make', 30).notNullable()
    table.text('model', 50).notNullable()
    table.decimal('mileage').notNullable()
    table.text('transmission')
    table.text('title')
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
};
