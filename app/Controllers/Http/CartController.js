'use strict'

const Cart = use('App/Models/Cart')
// const Database = use('Database')

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
        // .fetch()

        let cartResponse = await Cart.query().where({product_id: params.product_id}).fetch()

        return response.json(cartResponse)
        // cart.qty = qty
        // await cart.save()
        // return response.json(cart)
        // return response.json(cart)
        // const qty = request.input('qty')

        // let cart = await Cart.find(params.product_id)
        // if(!cart) {
        //     return response.status(404).json({data: 'Resource not'})
        // }
        
        // cart.qty = qty
        // await cart.save()
        // return response.json(cart)

    
        // const qty = request.input('qty')

        // const cart = await Database
        // .table('cart')
        // .where('product_id', product_id)
        // .update({qty: qty})
        // return response.json(cart)
        // cart.qty = cartInfo.qty


        // const cartInfo = request.only(['qty'])

        // const cart = await Cart.find(params.product_id)
        // cart.qty = cartInfo.qty
        
        // await cart.save()

        // return response.status(200).json(cart)
    }
}

module.exports = CartController
