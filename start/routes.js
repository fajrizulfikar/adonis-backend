'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.resource('products', 'ProductController')
  Route.resource('carts', 'CartController').only(['index', 'store'])
  Route.patch('carts/:product_id', 'CartController.update')
  Route.delete('carts/:product_id', 'CartController.destroy')
}).prefix('api/v1')
