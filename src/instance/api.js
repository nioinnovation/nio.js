var core = require('../core')

function nioAPI() {
    core.Readable.call(this)
}
nioAPI.prototype = Object.create(core.Readable.prototype, {
    makeRequest : {
	value: function(endpoint, postData) {
	    var xhr = d3.json('http://' + this.ip + '/' + endpoint)
		    .header("Authorization", this.authHeader)

	    if (typeof postData === 'undefined') {
		// They want a get request
		xhr.get(function(err, data) {
		    this.push(data)
		}.bind(this))
	    } else {
		// They want a post request
		xhr.post(postData, function(err, data) {
		    this.push(data)
		}.bind(this))
	    }
	}
    },

    setInstance: {
	value: function(ip, authHeader) {
	    this.ip = ip
	    this.authHeader = authHeader
	}
    },

    getChild: {
	value: function(type) {
	    var newType = new type()
	    newType.setInstance(this.ip, this.authHeader)
	    return newType
	}
    }
})
exports.API = nioAPI
