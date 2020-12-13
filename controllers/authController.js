var express = require('express');
const { logger } = require('../logger');
const { total_k8_pod_gauge, api_access_gauge } = require('./prometheusController')


const validateRequest = (req, res, next) => {
    logger.info(`Request ${req.baseUrl} `)
    api_access_gauge.inc()
    next()
}

module.exports =  {
    validateRequest,
}