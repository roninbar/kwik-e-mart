const path = require('path');
const debug = require('debug');
const { promises: fs } = require('fs');
const markdownPdf = require('markdown-pdf');

const log = debug('server:receipt');

async function generateReceipt(order) {
    await order.populate('items.product').execPopulate();
    const {
        _id,
        createdAt,
        customer: {
            _id: customerId,
            name: {
                first: firstName,
                last: lastName,
            },
        },
        delivery: {
            to: {
                house,
                street,
                city,
            },
            on: deliveryDate,
        },
        totalItems,
        total,
        payment: {
            cc: {
                number: ccnumber,
            },
        },
    } = order;
    const dir = path.join(global.staticFilesDir, 'receipts');
    await fs.mkdir(dir, { recursive: true });
    const rows = order.items
        .map(({ product: { name, price }, quantity }, idx) => `| ${idx + 1} | ${name} | ${quantity} | &euro;${price.toFixed(2)} | &euro;${(quantity * price).toFixed(2)} |`).join('\n');

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
| | **Total:** | **${totalItems}** | | **&euro;${total}** |

### Paid By Credit Card
CC Number: \`${ccnumber}\`  

***Thank you! Come again!***`;

    log(markdown);
    await fs.writeFile(path.join(dir, `${order._id}.md`), markdown);
    log('Generating PDF...');
    const pdfPath = path.join(dir, `${order._id}.pdf`);
    await new Promise(function (resolve, reject) {
        try {
            markdownPdf().from.string(markdown).to(pdfPath, resolve);
        } catch (err) {
            reject(err);
        }
    });
    log('done.');

    return { markdown, pdf: { filename: pdfPath } };
}

exports.generateReceipt = generateReceipt;
