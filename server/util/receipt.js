const { promises: fs } = require('fs');
const { mdToPdf } = require('md-to-pdf');
const path = require('path');

async function generateReceipt(order, dir) {
    await fs.mkdir(dir, { recursive: true });
    const rows = order.items.map(({ product: { name, price }, quantity }, idx) => `${idx + 1} | ${name} | ${quantity} | ${price} | ${quantity * price}`).join('\n');
    const totalItems = order.items.reduce((sum, { quantity }) => sum + quantity, 0);
    const totalPrice = order.items.reduce((sum, { product: { price }, quantity }) => sum + quantity * price, 0);
    const markdown = `\\# | Product | Quantity | Price | Total
-|-|-|-|-
${rows}
| **Total:** | **${totalItems}** | | **${totalPrice}**`;
    await fs.writeFile(path.join(dir, `${order._id}.md`), markdown);
    const pdf = await mdToPdf({ content: markdown }, { dest: path.join(dir, `${order._id}.pdf`) });
    return { markdown, pdf };
}

exports.generateReceipt = generateReceipt;
