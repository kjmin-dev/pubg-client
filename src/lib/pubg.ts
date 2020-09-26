import _fetcher from './_fetcher'

interface builder {
    seasons(): Promise<any>
    players(username: string): Promise<any>
    player(userid: string): Promise<any>
}

type BigPlatform = 'steam' | 'console' | 'kakao'

type Platform =
    | 'kakao'
    | 'stadia'
    | 'steam'
    | 'tournament' //Tournaments
    | 'psn' //PS4
    | 'xbox'
    | 'console' //PS4/Xbox (used for the /matches and /samples endpoints)

type Region =
    | 'pc-as'
    | 'pc-eu'
    | 'pc-jp'
    | 'pc-kakao'
    | 'pc-krjp'
    | 'pc-na'
    | 'pc-oc'
    | 'pc-ru'
    | 'pc-sa'
    | 'pc-sea'
    | 'pc-tournament'
    | 'psn-as'
    | 'psn-eu'
    | 'psn-na'
    | 'psn-oc'
    | 'xbox-as'
    | 'xbox-eu'
    | 'xbox-na'
    | 'xbox-oc'
    | 'xbox-sa'

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

    /* Get all available seasons */
    seasons(platform: Platform): Promise<any> {
        return this.get(`/shards/${platform}/seasons`)
    }

    /* Get player's seasons */
    lifetime(platform: Platform, userid: string): Promise<any> {
        return this.get(
            `/shards/${platform}/players/${userid}/seasons/lifetime`,
        )
    }

    /* Get player's season stat */
    stat(platform: Platform, userid: string, season: string): Promise<any> {
        return this.get(
            `/shards/${platform}/players/${userid}/seasons/${season}`,
        )
    }

    /* Get player's ranked season stat */
    rankedStat(
        platform: Platform,
        userid: string,
        season: string,
    ): Promise<any> {
        return this.get(
            `/shards/${platform}/players/${userid}/seasons/${season}/ranked`,
        )
    }

    /* Get player's weapon mastery level */
    weapon(platform: Platform, userid: string): Promise<any> {
        return this.get(`/shards/${platform}/players/${userid}/weapon_mastery`)
    }

    /* Get specific match data */
    match(platform: Platform, matchId: string): Promise<any> {
        return this.get(`/shards/${platform}/matches/${matchId}`)
    }

    /* Get season leaderboard of platform */
    leaderboards(
        platform: Platform | Region,
        seasonId: string,
        gameMode: string,
    ): Promise<any> {
        return this.get(
            `/shards/${platform}/leaderboards/${seasonId}/${gameMode}`,
        )
    }

    /* Get all tournaments info */
    tournaments(tid = ''): Promise<any> {
        return this.get(`/tournaments/${tid}`)
    }

    /* Get sample match ids */
    samples(platform: BigPlatform): Promise<any> {
        return this.get(`/shards/${platform}/samples`)
    }

    /* Get API server status */
    status(): Promise<any> {
        return this.get(`/status`)
    }
}

export default createInstance
