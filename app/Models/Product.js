'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    // cart() {
    //     return this.belongsTo('App/Models/Cart')
    // }
    static get table () {
        return 'product'
    }

    static get primaryKey() {
        return 'id'
    }
}

module.exports = Product
