'use strict'

const Product = use('App/Models/Product')

class ProductController {
    async index({ response }) {
        let products = await Product.all()

        return response.json(products)
    }

    async store({ request, response }) {
        const productInfo = request.only(['name', 'image', 'price', 'description'])

        const product = new Product()
        product.name = productInfo.name
        product.image = productInfo.image
        product.price = productInfo.price
        product.description = productInfo.description

        await product.save()

        return response.status(201).json(product)
    }

    async show({params, response}) {
        const product = await Product.find(params.id)

        return response.json(product)
    }
}

module.exports = ProductController
