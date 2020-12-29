const { promises: fs } = require('fs');
const path = require('path');
const util = require('util');
const debug = require('debug');
const { Router } = require('express');
const { mdToPdf } = require('md-to-pdf');
const Order = require('../models/Order');
const passport = require('../util/passport');

const log = debug('server:order');

const router = new Router();

router.post('/', passport.allow('user'), async function ({ originalUrl, user, body }, res) {
    log(util.inspect({ user, body }, { depth: 4, colors: true }));
    const order = new Order({ customer: user, ...body });
    await order.populate('items.product').execPopulate();
    const { pdf: { filename: receipt } } = await generateReceipt(order, path.join(__dirname, '../public/receipts'));
    try {
        const { _id } = await order.save();
        return res.set('Content-Location', `${originalUrl}/${_id}`).status(201).json({ ...order.toObject(), receipt });
    } catch (e) {
        const errors = e.errors ? Object.values(e.errors) : [];
        const messages = errors.map(({ message }) => message).join('\n');
        return res.status(e.errors ? 400 : 500).send(messages);
    }
});

router.get('/all', async function (req, res) {
    const orders = await Order.find();
    return res.json(orders);
});

router.get('/:id', async function ({ params: { id } }, res) {
    const order = await Order.findById(id);
    return order ? res.json(order) : res.sendStatus(404);
})

module.exports = router;

async function generateReceipt(order, dir) {
    await fs.mkdir(dir, { recursive: true });
    const rows = order.items.map(({ product: { name, price }, quantity }, idx) => `${idx + 1} | ${name} | ${quantity} | ${price} | ${quantity * price}`).join('\n');
    const total = order.items.reduce((sum, { product: { price }, quantity }) => sum + quantity * price, 0);
    const markdown =
        `\\# | Product | Quantity | Price | Total
-|-|-|-|-
${rows}
| **Total:** | | | **${total}**`;
    await fs.writeFile(path.join(dir, `${order._id}.md`), markdown);
    const pdf = await mdToPdf({ content: markdown }, { dest: path.join(dir, `${order._id}.pdf`) });
    return { markdown, pdf };
}

