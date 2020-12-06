const hash = require('../util/hash');
const { Schema, model } = require('mongoose');

const schema = new Schema({
    _id: { type: String, match: /^\d{9}$/ },
    role: { type: String, required: true, enum: ['user', 'admin'] },
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
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

schema.method('validPassword', function (password) {
    return this.passwordHash === hash(password);
});

schema.virtual('password').set(function (password) {
    this.passwordHash = hash(password);
});

schema.virtual('firstName')
    .get(function () {
        return this.name.first;
    })
    .set(function (firstName) {
        this.name.first = firstName;
    });

schema.virtual('lastName')
    .get(function () {
        return this.name.last;
    })
    .set(function (lastName) {
        this.name.last = lastName;
    });

schema.virtual('city')
    .get(function () {
        return this.address.city;
    })
    .set(function (city) {
        this.address.city = city;
    });

schema.virtual('streetAddress')
    .get(function () {
        return `${this.address.house} ${this.address.street}`;
    })
    .set(function (streetAddress) {
        const { groups: { house, street } } = streetAddress.match(/^(?<house>\d+)\s+(?<street>.*)$/);
        Object.assign(this.address, { street, house });
    });

module.exports = model('User', schema);

