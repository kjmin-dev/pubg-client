import _fetcher from './_fetcher'

class createInstance extends _fetcher {
    constructor(newKey = '') {
        super(newKey)
    }

    seasons(): Promise<any> {
        return this.get('/shards/pc-krjp/seasons')
    }

    players(platform: string, username: string): Promise<any> {
        return this.get(
            `/shards/${platform}/players?filter[playerNames]=${username}`,
        )
    }
}

export default createInstance
