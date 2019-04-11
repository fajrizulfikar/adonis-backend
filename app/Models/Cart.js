'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cart extends Model {
    // product() {
    //     return this.hasMany('App/Models/Product')
    // }
    static get table() {
        return 'cart'
    }

    // static get foreignKey() {
    //     return 'product_id'
    // }
    static get primaryKey() {
        return 'id'
    }
}

module.exports = Cart
