const mongoose = require('mongoose');
const hash = require('../util/hash');

const schema = new mongoose.Schema({
    id: { type: String, required: true, unique: true, match: /^\d{9}$/ },
    role: { type: String, required: true, enum: ['user', 'admin'] },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: {
        first: { type: String, required: true, trim: true },
        last: { type: String, required: true, trim: true },
    },
    address: {
        city: { type: String, required: true, trim: true },
        street: { type: String, required: true, trim: true },
        house: { type: Number, required: true, min: 1 },
    },
}, {
    timestamps: true,
});

schema.virtual('password').set(function (password) {
    this.passwordHash = hash(password);
});

schema.method('verify', function (password) {
    return this.passwordHash === hash(password);
});

schema.virtual('streetAddress')
    .get(function () {
        return `${this.address.house} ${this.address.street}`;
    })
    .set(function (address) {
        const { groups: { house, street } } = address.match(/^(?<house>\d+)\s+(?<street>.*)$/);
        Object.assign(this.address, { street, house });
    });

module.exports = mongoose.model('User', schema);

