const fetch = require('node-fetch');

callAPI = async (uri, headers, body) => {
    const response = await fetch(uri, {
        method: 'post',
        body: JSON.stringify(body),
        headers: headers,
    })
        .then(result => result.json())
        .then(json => {
            return { status: true, message: json };
        })
        .catch(err => {
            console.error(err.message);
            return { status: false, message: err.message };
        });
    return response;
}


module.exports = { callAPI };