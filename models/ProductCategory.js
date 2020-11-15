const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('ProductCategory', schema);

