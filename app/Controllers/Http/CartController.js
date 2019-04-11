'use strict'

const Cart = use('App/Models/Cart')

class CartController {
    async index({ response }) {
        let carts = await Cart
        .query()
        .table('product')
        .innerJoin('cart', function () {
            this
            .on('product.id', 'cart.product_id')
        })
        .fetch()
        return response.json(carts)
    }

    async store({request, response}) {
        const cartInfo = request.only(['product_id', 'qty', 'price'])

        const cart = new Cart()
        cart.product_id = cartInfo.product_id
        cart.qty = cartInfo.qty
        cart.price = cartInfo.price

        await cart.save()

        return response.status(201).json(cart)
    }

    async update({params, request, response}) {
        const qty = request.input('qty')

        let cart = await Cart
        .query()
        .where({product_id: params.product_id})
        .update({qty: qty})

        let cartResponse = await Cart.query().where({product_id: params.product_id}).fetch()

        return response.json(cartResponse)
    }
}

module.exports = CartController
