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

        return response.json({ carts: carts, totalPrice: totalPrice })
    }

    async store({ request, response }) {
        const cartInfo = request.only(['user_id', 'product_id', 'qty', 'price'])

        const cart = new Cart()
        cart.user_id = cartInfo.user_id
        cart.product_id = cartInfo.product_id
        cart.qty = cartInfo.qty
        cart.price = cartInfo.price

        await cart.save()

        let carts = await Cart
            .query()
            .table('product')
            .innerJoin('cart', 'product.id', 'cart.product_id')
            .where({ product_id: cart.product_id })
            .fetch()

        return response.status(201).json(carts)
    }

    async update({ params, request, response }) {
        const qty = request.input('qty')

        if (qty < 1) {
            let cart = await Cart
                .query()
                .where('cart.id', params.id)
                .update({ qty: 1 })
        } else {
            let cart = await Cart
                .query()
                .where('cart.id', params.id)
                .update({ qty: qty })
        }

        let carts = await Cart
            .query()
            .table('product')
            .innerJoin('cart', 'product.id', 'cart.product_id')
            .where('cart.id', params.id)
            .fetch()

        let totalPrice = 0

        let cartList = await Cart.all()
        let cartListJSON = cartList.toJSON()
        cartListJSON.map(cart => {
            return totalPrice += cart.qty * cart.price
        })

        return response.json({ carts: carts, totalPrice: totalPrice })
        // return response.status(201).json(carts)
    }

    async destroy({ params, response }) {
        let cart = await Cart
            .query()
            .where('cart.id', params.id)
            // .where('product_id', params.product_id)
            .delete()

        let carts = await Cart
            .query()
            .table('product')
            .innerJoin('cart', 'product.id', 'cart.product_id')
            .fetch()

        let totalPrice = 0

        let cartList = await Cart.all()
        let cartListJSON = cartList.toJSON()
        cartListJSON.map(cart => {
            return totalPrice += cart.qty * cart.price
        })

        return response.json({ carts: carts, totalPrice: totalPrice })
        // return response.json(carts)
    }
}

module.exports = CartController