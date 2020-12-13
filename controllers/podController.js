const _ = require("lodash");
const { logger } = require('../logger');
var { getK8Data, k8_base_url } = require("./k8sController")
var { Pod } = require('../models/pod')
const { total_k8_pod_gauge } = require('./prometheusController')
podCount = 0


const getAllPods = (callback) => {
    getK8Data(`${k8_base_url}/api/v1/pods`).then((response) => {
        var result = [];
        statusCode = response.statusCode
        response = response.body
        if (statusCode != 200 ) {
            callback({
                code : response.code,
                reason : response.reason,
                message: response.message,
                status : response.status

            }, null)
        } else {
            response.items.forEach((podObj) => {
                result.push(new Pod(podObj))
            })
            callback(null, result)
        }
    }).catch((e) => {
        console.log(e.name)
        callback(e, null)
    }) 
}

const collector = () => {
    // batch job to get data every defined time interval
    m_interval = process.env.M_INTERVAL || 15000
    let getPodData = () => {
    getAllPods((err, data) => {
        if (err) {
            logger.error("Error occured")
            logger.error(`Error ${err.code}: ${err.status} ${err.message} [${err.reason}]`)
        }
        if (data) {
            if ( data.length > podCount ) {
                total_k8_pod_gauge.inc(data.length-podCount)
            } else if (data.length < podCount ) {
                total_k8_pod_gauge.dec(podCount-data.length)
            } else {
                logger.info("there is no change in the pod count.")
            }
            podCount = data.length 
        }
    })
    }
    getPodData()
    setInterval(() => {
        getPodData()
    }, m_interval)
}

module.exports = {
    getAllPods,
    collector
}