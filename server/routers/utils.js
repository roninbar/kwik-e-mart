async function createResource(url, doc, res) {
    const { _id } = await doc.save();
    return res.set('Content-Location', `${url}/${_id}`).status(201).json(doc);
}

exports.createResource = createResource;
