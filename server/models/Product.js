const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    price: { type: Schema.Types.Decimal128, get: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
}, {
    id: false,
    timestamps: true,
    toJSON: {
        getters: true,
    },
});

module.exports = model('Product', schema);

