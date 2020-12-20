const { model, Schema } = require('mongoose');

const schema = new Schema({
    ship: {
        on: Date,
        to: {
            city: String,
            street: String,
            house: Number,
        },
    },
    payment: {
        creditcard: {
            number: String,
        }
    },
    products: { type: Map, of: {quantity} },
}, {
    timestamps: true,
});

module.exports = model('Order', schema);

