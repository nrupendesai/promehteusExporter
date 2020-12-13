const client = require('prom-client');
const Registry = client.Registry;
const register = new Registry();

const total_k8_pod_gauge = new client.Gauge({ name: 'pod_count', help: 'Number of pods running in the system' });
total_k8_pod_gauge.set(0);

const api_access_gauge = new client.Counter({ name: 'api_access_count', help: 'Number of times an endpoint for the application is accessed.' });

register.registerMetric(total_k8_pod_gauge);
register.registerMetric(api_access_gauge);

module.exports = {
    total_k8_pod_gauge,
    api_access_gauge,
    register
}