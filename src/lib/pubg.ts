import fetcher from './fetcher'

class createInstance extends fetcher {
    constructor(newPrefix = 'https://api.pubg.com') {
        super(newPrefix)
    }

    seasons(): Promise<any> {
        return this.get('/shards/pc-krjp/seasons')
    }

    player(region: string, id: string): Promise<any> {
        return this.get(`/shards/${region}/players?filter[playerNames]=${id}`)
    }
}

export default createInstance
