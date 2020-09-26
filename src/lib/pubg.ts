import _fetcher from './_fetcher'

class createInstance extends _fetcher {
    constructor(newKey = '') {
        super(newKey)
    }

    seasons(): Promise<any> {
        return this.get('/shards/pc-krjp/seasons')
    }

    players(region: string, id: string): Promise<any> {
        return this.get(`/shards/${region}/players?filter[playerNames]=${id}`)
    }
}

export default createInstance
