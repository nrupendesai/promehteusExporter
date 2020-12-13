# promehteusExporter
Node js application scapring custom prometheus metrics

set below environment to start
-------------------------------

M_INTERVAL = 15000 (15 seconds)
K8_BASE_URL = "<K8-cluster-api-endpoint>"
AUTH_TOKEN= "<auth-token-received-from-k8-for-authentication>"

Environment tested with
-----------------------
node version: v14.15.1
npm version: 6.14.8

Follow below steps to run service after you clone the repo
----------------------------------------------------------

1. Install node modules
    cd <repo directory path>
    npm i
2. setup above environment variable to access your k8 cluster as below.
    export M_INTERVAL = 15000
    export K8_BASE_URL = "<K8-cluster-api-endpoint>" (replace <K8-cluster-api-endpoint> with your kubernetes cluster endpoint)
    export AUTH_TOKEN= "<auth-token-received-from-k8-for-authentication>" (replace <auth-token-received-from-k8-for-authentication> with your auth token)
3. npm start
    Note: metrics will be scapred at <server-info/ip>:3000/metrics

4. Use Grafana and Prometheus to view the information for
    pod_count
    api_access_count