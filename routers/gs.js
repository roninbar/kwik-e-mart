const { Types: { ObjectId } } = require('mongoose');
const { Storage } = require('@google-cloud/storage');
const { Router } = require('express');

const router = new Router();

router.post('/', async function ({ body: { path, type: contentType } }, res) {
    const gs = new Storage();
    const mimeTypeRegex = /^image\/(?<fileType>.*)$/;
    if (path?.endsWith('/') && typeof contentType === 'string' && mimeTypeRegex.test(contentType)) {
        const { groups: { fileType } } = contentType.match(mimeTypeRegex);
        const fileName = `${path}${new ObjectId()}.${fileType}`;
        const getUrl = `/${fileName}`;
        const [putUrl] = await gs.bucket('kwik-e-mart').file(fileName).getSignedUrl({
            version: 'v4',
            action: 'write',
            expires: Date.now() + 60_000,
            contentType,
        });
        return res.status(201).json({ putUrl, getUrl });
    }
    else {
        return res.sendStatus(400);
    }
});

module.exports = router;

