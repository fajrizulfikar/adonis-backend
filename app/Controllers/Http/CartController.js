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


        // let carts = await Cart.all()

        // return response.json(carts)
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
}

module.exports = CartController
