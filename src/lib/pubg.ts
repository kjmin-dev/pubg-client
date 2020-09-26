import _fetcher from './_fetcher'

interface builder {
    seasons(): Promise<any>
    players(username: string): Promise<any>
    player(userid: string): Promise<any>
}

type Platform =
    | 'kakao'
    | 'stadia'
    | 'steam'
    | 'tournament' //Tournaments
    | 'psn' //PS4
    | 'xbox'
    | 'console' //PS4/Xbox (used for the /matches and /samples endpoints)

class createInstance extends _fetcher {
    constructor(newKey = '') {
        super(newKey)
    }

    /* Functional builder */
    public platform(_platform: Platform): builder {
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

    /* Get all available seasons */
    seasons(platform: Platform): Promise<any> {
        return this.get(`/shards/${platform}/seasons`)
    }

    /* Find users fy name */
    players(platform: Platform, username: string): Promise<any> {
        return this.get(
            `/shards/${platform}/players?filter[playerNames]=${username}`,
        )
    }

    /* Find user by identifier */
    player(platform: Platform, userid: string): Promise<any> {
        return this.get(`/shards/${platform}/players/${userid}`)
    }
}

export default createInstance
