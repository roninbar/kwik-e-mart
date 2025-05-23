const path = require('path');
const debug = require('debug');
const { promises: fs } = require('fs');
const { mdToPdf } = require('md-to-pdf');
const { Storage } = require('@google-cloud/storage');

const log = debug('kwik-e-mart:receipt');

async function generateReceipt(order) {
    await order.populate('items.product').execPopulate();
    const {
        _id,
        createdAt,
        customer: { _id: customerId, name: { first: firstName, last: lastName, }, },
        delivery: { to: { house, street, city, }, on: deliveryDate, },
        totalItems,
        total,
        payment: { cc: { number: ccnumber, }, },
    } = order;
    const dir = path.join(global.staticFilesDir, 'receipts');
    await fs.mkdir(dir, { recursive: true });
    const rows = order.items
        .map(({ product: { name, price }, quantity }, idx) => `| ${idx + 1} | ${name} | ${quantity} | $${price.toFixed(2)} | $${(quantity * price).toFixed(2)} |`)
        .join('\n');

    const markdown = `# Kwik-E-Mart
**${createdAt.toLocaleString('en-GB')}**  

## Order #${_id}

### Customer ${customerId}
**${firstName} ${lastName}**  
${street} ${house}  
${city}  

### Deliver On ${deliveryDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}  

| # | Product | Quantity | Price | Total |
|-|-|-|-|-|
${rows}
| | **Total:** | **${totalItems}** | | **$${total}** |

### Paid By Credit Card
CC Number: \`${ccnumber}\`  

***Thank you! Come again!***`;

    log(markdown);
    await fs.writeFile(path.join(dir, `${order._id}.md`), markdown);
    log('Generating PDF...');
    const pdfPath = path.join(dir, `${order._id}.pdf`);
    const pdf = await mdToPdf({
        content: markdown,
    }, {
        dest: pdfPath,
        launch_options: {
            args: ['--no-sandbox']
        },
    });
    log('Uploading PDF to Google Cloud Storage...');
    const storage = new Storage();
    await storage.bucket('kwik-e-mart').upload(pdfPath, { destination: `receipts/${path.basename(pdfPath)}` });
    log('Done.');

    return { markdown, pdf };
}

exports.generateReceipt = generateReceipt;
