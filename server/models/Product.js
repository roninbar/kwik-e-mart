const { Schema, model } = require('mongoose');

module.exports = model('Product', new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
}, {
    timestamps: true,
}));

