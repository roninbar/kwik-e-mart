const { constants: { W_OK } } = require('fs');
const { mkdir, stat } = require('fs/promises');
const path = require('path');

async function storeImageFile(_id, imageFile) {
    const imageFileName = `${_id}${path.extname(imageFile.name)}`;
    const imageDir = path.join(global.staticFilesDir, 'products');
    try {
        await stat(imageDir, W_OK);
    } catch (e) {
        await mkdir(imageDir, { recursive: true });
    }
    await imageFile.mv(path.join(imageDir, imageFileName));
    return `/products/${imageFileName}`;
}

exports.storeImageFile = storeImageFile;

async function createResource(res, url, doc) {
    const { _id } = await doc.save();
    return res.status(201).set('Content-Location', `${url}/${_id}`).json(doc);
}

exports.createResource = createResource;
