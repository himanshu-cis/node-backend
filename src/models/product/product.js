const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    productName: {
        type: String,
        required: [true],
    },
    productDesc: {
        type: String,
    },
    createdAt: {
        type: Date,
        // required: [true]
    },
    createdBy: {
        type: ObjectId,
    }
});


const Product = mongoose.model('Product', schema);

module.exports = {
    Product
}