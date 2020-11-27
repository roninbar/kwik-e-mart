const { Schema, model } = require('mongoose');

module.exports = model('ProductCategory', new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, {
    timestamps: true,
}));

