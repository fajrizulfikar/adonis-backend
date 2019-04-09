'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('product', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('image', 100).notNullable()
      table.double('price', 20).notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('product')
  }
}

module.exports = ProductSchema
