'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartSchema extends Schema {
  up() {
    this.create('cart', (table) => {
      table.increments()
      table.integer('product_id').unsigned().notNullable().references('id').inTable('product')
      table.integer('qty', 100).notNullable()
      table.double('price', 20).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('cart')
  }
}

module.exports = CartSchema
