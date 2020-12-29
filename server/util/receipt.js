const path = require('path');
const debug = require('debug');
const { promises: fs } = require('fs');
const { mdToPdf } = require('md-to-pdf');

const log = debug('server:receipt');

async function generateReceipt(order) {
    await order.populate('items.product').execPopulate();
    const dir = path.join(global.staticFilesDir, 'receipts');
    await fs.mkdir(dir, { recursive: true });
    const rows = order.items.map(({ product: { name, price }, quantity }, idx) => `${idx + 1} | ${name} | ${quantity} | ${price} | ${quantity * price}`).join('\n');
    const totalItems = order.items.reduce((sum, { quantity }) => sum + quantity, 0);
    const totalPrice = order.items.reduce((sum, { product: { price }, quantity }) => sum + quantity * price, 0);
    const markdown = `\\# | Product | Quantity | Price | Total
-|-|-|-|-
${rows}
| **Total:** | **${totalItems}** | | **${totalPrice}**`;
    log(markdown);
    await fs.writeFile(path.join(dir, `${order._id}.md`), markdown);
    log('Generating PDF...');
    const pdf = await mdToPdf({ content: markdown }, { dest: path.join(dir, `${order._id}.pdf`) });
    log('done.');
    return { markdown, pdf };
}

exports.generateReceipt = generateReceipt;
