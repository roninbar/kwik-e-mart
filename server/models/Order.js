const { model, Schema } = require('mongoose');
const debug = require('debug')('server:order');

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
            last4: { type: String, match: /^\w{4}$/, required: true, trim: true },
        }
    },
    items: [{
        _id: { type: Schema.Types.ObjectId, select: false },
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    }],
}, {
    timestamps: true,
});

schema.virtual('payment.cc.number')
    .get(function () {
        return `**** **** **** ${this.payment.cc.last4}`;
    })
    .set(function (ccnumber) {
        const match = ccnumber.match(/(\w{4})\s*$/);
        this.payment.cc.last4 = match && match.length >= 2 && match[1];
    });

schema.post('save', function () {
    debug(this);
});

module.exports = model('Order', schema);

