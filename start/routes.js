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
  Route.resource('products', 'ProductController').only(['index', 'store'])
  Route.get('products/:id', 'ProductController.show')
  Route.resource('carts', 'CartController').only(['index', 'store'])
}).prefix('api/v1')

// Route.group(() => {
//   Route.get('carts', 'CartController.index')
//   Route.post('carts', 'CartController.store')
// }).prefix('api/v1')
