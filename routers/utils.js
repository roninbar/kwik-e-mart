const path = require('path');

async function storeImageFile(_id, imageFile) {
    const imagesDir = path.join(global.staticFilesDir, 'products');
    const imageFileName = `${_id}${path.extname(imageFile.name)}`;
    await imageFile.mv(path.join(imagesDir, imageFileName));
    return `/products/${imageFileName}`;
}

exports.storeImageFile = storeImageFile;

async function createResource(res, url, doc) {
    const { _id } = await doc.save();
    return res.status(201).set('Content-Location', `${url}/${_id}`).json(doc);
}

exports.createResource = createResource;
