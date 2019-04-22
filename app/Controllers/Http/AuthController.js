'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({ request, auth, response }) {
        try {
            const data = request.only(['username', 'email', 'password'])
            console.log(data);
            let user = await User.create(data)
            let accessToken = await auth.generate(user)
            return response.json({ 'user': user, 'access_token': accessToken })
        } catch (e) {
            console.log(e);
            return response.status(400).send({ 'message': 'Something went wrong!' })
        }
    }

    async login({ request, auth, response }) {
        const email = request.input('email')
        const password = request.input('password')
        console.log(email, password);

        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email)
                let accessToken = await auth.generate(user)
                return response.json({ 'user': user, 'access_token': accessToken })
            }
        } catch (e) {
            console.log(e);
            return response.status(400).send({ 'message': 'Something went wrong!' })
        }
    }

    async show({ params, response }) {
        try {
            const {id} = params 
            const user = await User.find(id)
            return response.json({'user': user})
        } catch (e) {
            console.log(e);
            return response.status(400).send({ 'message': 'Something went wrong!' })
        }
    }
}

module.exports = AuthController
