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

        let totalPrice = 0
            
        let cartList = await Cart.all()
        let cartListJSON = cartList.toJSON()
        cartListJSON.map(cart => {
            return totalPrice += cart.qty * cart.price
        })

        return response.json({ carts: carts, totalPrice: totalPrice})
    }

    async store({ request, response }) {
        const cartInfo = request.only(['product_id', 'qty', 'price'])

        const cart = new Cart()
        cart.product_id = cartInfo.product_id
        cart.qty = cartInfo.qty
        cart.price = cartInfo.price

        await cart.save()

        return response.status(201).json(cart)
    }

    async update({ params, request, response }) {
        const qty = request.input('qty')

        if (qty < 1) {
            let cart = await Cart
                .query()
                .where({ product_id: params.product_id })
                .update({ qty: 1 })
        } else {
            let cart = await Cart
                .query()
                .where({ product_id: params.product_id })
                .update({ qty: qty })
        }

        let carts = await Cart
            .query()
            .table('product')
            .innerJoin('cart', 'product.id', 'cart.product_id')
            // .where({product_id: params.product_id})
            .fetch()

        return response.json(carts)
    }

    async destroy({ params, response }) {
        // console.log(params.product_id)
        let cart = await Cart
            .query()
            .where('product_id', params.product_id)
            .delete()

        let carts = await Cart
            .query()
            .table('product')
            .innerJoin('cart', 'product.id', 'cart.product_id')
            .fetch()

        return response.json(carts)
    }
}

module.exports = CartController
