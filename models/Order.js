const { model, Schema } = require('mongoose');

const schema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    delivery: {
        on: { type: Date, required: true },
        to: {
            city: { type: String, required: true },
            street: { type: String, required: true },
            house: { type: Number, required: true },
        },
    },
    payment: {
        cc: {
            last4: { type: String, match: /^\d{4}$/, required: true },
        }
    },
    products: [{
        _id: { type: Schema.Types.ObjectId, select: false },
        id: { type: Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
        quantity: { type: Number, required: true },
    }],
}, {
    timestamps: true,
});

schema.virtual('payment.cc.number').set(function (ccnumber) {
    const [last4] = ccnumber.match(/\d{4}$/);
    this.payment.cc.last4 = last4
});

module.exports = model('Order', schema);

