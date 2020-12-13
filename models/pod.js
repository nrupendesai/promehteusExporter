var _ = require('lodash')
class Pod {
    constructor(data) {
        if (!_.isEmpty(data)) {
            this.name = data.metadata.name
            this.metadata = data.metadata || {}
            this.spec = data.spec || {}
            this.status = data.status || {}
        }
    }
}


module.exports = {
    Pod
}