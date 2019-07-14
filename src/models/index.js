const { Product } = require('../models/product/product')
const { User } = require('../models/user/user')


module.exports = {
    'users': 'db_users',
    'products': Product,
    'users': User
}