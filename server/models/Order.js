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
    products: [{
        id: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
    }],
}, {
    timestamps: true,
});

module.exports = model('Order', schema);

