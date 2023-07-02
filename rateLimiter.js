class RateLimiter {
    hashmap = new Map()
    constructor(totalLimit, timeThreshold) {
        this.totalLimit = totalLimit
        this.timeThreshold = timeThreshold
    }

    isAllowed(clientId) {
        if (!this.hashmap.get(clientId)) {
            this.hashmap.set(clientId, [1, new Date()])
        }
        else {
            const [times, lastUpdated] = this.hashmap.get(clientId)
            if (new Date() - lastUpdated < this.timeThreshold && times >= this.totalLimit) {
                console.log(clientId + ' Rate limit exceed , Try afetefr 60 seconds')
                return
            }
            else {
                this.hashmap.set(clientId, [this.hashmap.get(clientId)[0] + 1, new Date()])
                console.log(clientId + ' added')
                return
            }
        }
    }

    // cleaning up the rate limiter is yet to design

}

const OurRateLimiter = new RateLimiter(10, 60000)

setInterval(() => {
    OurRateLimiter.isAllowed(Math.floor(Math.random() * 100))
    // console.log(OurRateLimiter)
}, 10)