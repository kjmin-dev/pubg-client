import _fetcher from './_fetcher'

interface builder {
    seasons(): Promise<any>
    players(username: string): Promise<any>
    player(userid: string): Promise<any>
}

class createInstance extends _fetcher {
    constructor(newKey = '') {
        super(newKey)
    }

    /* Functional builder */
    public platform(_platform: string): builder {
        const context = this
        return {
            seasons() {
                return context.seasons(_platform)
            },
            players(username: string) {
                return context.players(_platform, username)
            },
            player(userid: string) {
                return context.player(_platform, userid)
            },
        }
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
