import _fetcher from './_fetcher'

class createInstance extends _fetcher {
    constructor(newKey = '') {
        super(newKey)
    }

    /* Get all seasons */
    seasons(platform: string): Promise<any> {
        return this.get(`/shards/${platform}/seasons`)
    }

    /* Find users fy name */
    players(platform: string, username: string): Promise<any> {
        return this.get(
            `/shards/${platform}/players?filter[playerNames]=${username}`,
        )
    }

    /* Find user by identifier */
    player(platform: string, userid: string): Promise<any> {
        return this.get(`/shards/${platform}/players/${userid}`)
    }
}

export default createInstance
