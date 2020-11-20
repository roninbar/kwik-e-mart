const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'Product' },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Cart', schema);

