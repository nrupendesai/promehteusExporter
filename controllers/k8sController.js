const request = require('request');
const _ = require('lodash')
const { logger } = require('../logger');
const token = process.env['AUTH_TOKEN']
var opts = {}

if (!_.isEmpty(token)) {
    opts = {
        "Authorization": `Bearer ${token}` 
    };
}
const k8_base_url = process.env['K8_BASE_URL'] || "https://127.0.0.1"

const getK8Data = (path) => {
    return new Promise( (resolve, reject) => {
        request.get({
            url : path,
            headers: opts
        },
        (error, response) => {
            if (error) {
                reject(error)
            }
            if (response) {
                resolve({body: JSON.parse(response.body), statusCode: JSON.parse(response.statusCode)})
            }
        });
    })
}

module.exports = {
    request,
    opts,
    getK8Data,
    k8_base_url
}