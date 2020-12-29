const path = require('path');
const debug = require('debug');
const { model, Schema } = require('mongoose');
const { generateReceipt } = require('../util/receipt');

const log = debug('server:order');

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
    receiptUrl: String,
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

schema.post('save', async function (order, next) {
    const { pdf: { filename: receiptFilename } } = await generateReceipt(order);
    order.receiptUrl = '/' + path.relative(global.staticFilesDir, receiptFilename).replace(path.sep, '/');
    return next();
});

module.exports = model('Order', schema);

