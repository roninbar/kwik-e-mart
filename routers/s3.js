const { Types: { ObjectId } } = require('mongoose');
const { S3, config } = require('aws-sdk');
const { Router } = require('express');

const S3_BUCKET_NAME = process.env['S3_BUCKET_NAME'] || 'kwik-e-mart';
const AWS_REGION = process.env['AWS_REGION'] || 'eu-central-1';

config.region = AWS_REGION;

const router = new Router();

router.post('/', async function ({ body: { mimeType } }, res) {
    const s3 = new S3();
    const { groups: { fileType } } = mimeType.match(/^image\/(?<fileType>.*)$/);
    const fileName = `${new ObjectId()}.${fileType}`;
    const putUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: S3_BUCKET_NAME,
        ContentType: mimeType,
        Key: fileName,
        Expires: 60,
        ACL: 'public-read',
    });
    const getUrl = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    return res.status(201).json({ putUrl, getUrl });
});

module.exports = router;

