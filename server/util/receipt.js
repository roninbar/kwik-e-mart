const { promises: fs } = require('fs');
const { mdToPdf } = require('md-to-pdf');
const path = require('path');

async function generateReceipt(order, dir) {
    await fs.mkdir(dir, { recursive: true });
    const rows = order.items.map(({ product: { name, price }, quantity }, idx) => `${idx + 1} | ${name} | ${quantity} | ${price} | ${quantity * price}`).join('\n');
    const total = order.items.reduce((sum, { product: { price }, quantity }) => sum + quantity * price, 0);
    const markdown = `\\# | Product | Quantity | Price | Total
-|-|-|-|-
${rows}
| **Total:** | | | **${total}**`;
    await fs.writeFile(path.join(dir, `${order._id}.md`), markdown);
    const pdf = await mdToPdf({ content: markdown }, { dest: path.join(dir, `${order._id}.pdf`) });
    return { markdown, pdf };
}

exports.generateReceipt = generateReceipt;
