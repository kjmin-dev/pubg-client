import _fetcher from './_fetcher'

interface Builder_season {
    stat(userid: string): Promise<any>
    rankedStat(userid: string): Promise<any>
    leaderboards(gameMode: GameMode): Promise<any>
}

interface Builder_user {
    json(): Promise<any>
    weapon(): Promise<any>
    stat(seasonid: string): Promise<any>
    rankedStat(seasonid: string): Promise<any>
}

interface Builder_platform {
    season(_seasonid: string): Builder_season
    user(_userid: string): Builder_user
    seasons(): Promise<any>
    players(username: string): Promise<any>
    player(userid: string): Promise<any>
    lifetime(userid: string): Promise<any>
    match(matchid: string): Promise<any>
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

type GameMode =
    | 'solo' //1 player per team, third person perspective
    | 'solo-fpp' //1 player per team, first person perspective
    | 'duo' //up to 2 people per team, third person perspective
    | 'duo-fpp' //up to 2 people per team, first person perspective
    | 'squad' //more than 2 people per team, third person perspective
    | 'squad-fpp' //more than 2 people per team, first person perspective

class createInstance extends _fetcher {
    constructor(newKey = '') {
        super(newKey)
    }

    /* Functional builder */
    public platform(_platform: Platform): Builder_platform {
        const context = this
        return {
            season(_seasonid: string): Builder_season {
                return {
                    // platform().seasons().stat()
                    stat(userid: string) {
                        return context.stat(_platform, userid, _seasonid)
                    },
                    // platform().seasons().rankedStat()
                    rankedStat(userid: string) {
                        return context.rankedStat(_platform, userid, _seasonid)
                    },
                    // platform().seasons().leaderboards()
                    leaderboards(gameMode: GameMode) {
                        return context.leaderboards(
                            _platform,
                            _seasonid,
                            gameMode,
                        )
                    },
                }
            },
            user(_userid: string): Builder_user {
                return {
                    /**
                     * platform().user().json()
                     * returns api.player(userid)
                     */
                    json() {
                        return context.player(_platform, _userid)
                    },
                    // platform().user().stat()
                    stat(seasonid: string) {
                        return context.stat(_platform, _userid, seasonid)
                    },
                    // platform().user().rankedStat()
                    rankedStat(seasonid: string) {
                        return context.rankedStat(_platform, _userid, seasonid)
                    },
                    weapon() {
                        return context.weapon(_platform, _userid)
                    }
                }
            },
            // platform().seasons()
            seasons() {
                return context.seasons(_platform)
            },
            // platform().players()
            players(username: string) {
                return context.players(_platform, username)
            },
            // platform().player()
            player(userid: string) {
                return context.player(_platform, userid)
            },
            // platform().lifetime()
            lifetime(userid: string) {
                return context.lifetime(_platform, userid)
            },
            match(matchid: string) {
                return context.match(_platform, matchid)
            }
        }
    }

    /**
     * players: Find users fy name
     * @param platform 
     * @param username 
     */
    players(platform: Platform, username: string): Promise<any> {
        return this.get(
            `/shards/${platform}/players?filter[playerNames]=${username}`,
        )
    }

    /**
     * player: Find user by identifier
     * @param platform 
     * @param userid 
     */
    player(platform: Platform, userid: string): Promise<any> {
        return this.get(`/shards/${platform}/players/${userid}`)
    }

    /**
     * seasons: Get all available seasons
     * @param platform 
     */
    seasons(platform: Platform): Promise<any> {
        return this.get(`/shards/${platform}/seasons`)
    }

    /**
     * lifetime: Get player's seasons
     * @param platform 
     * @param userid 
     */
    lifetime(platform: Platform, userid: string): Promise<any> {
        return this.get(
            `/shards/${platform}/players/${userid}/seasons/lifetime`,
        )
    }

    /**
     * stat: Get player's season stat
     * @param platform 
     * @param userid 
     * @param seasonid 
     */
    stat(platform: Platform, userid: string, seasonid: string): Promise<any> {
        return this.get(
            `/shards/${platform}/players/${userid}/seasons/${seasonid}`,
        )
    }

    /**
     * rankedStat: Get player's ranked season stat
     * @param platform 
     * @param userid 
     * @param seasonid 
     */
    rankedStat(
        platform: Platform,
        userid: string,
        seasonid: string,
    ): Promise<any> {
        return this.get(
            `/shards/${platform}/players/${userid}/seasons/${seasonid}/ranked`,
        )
    }

    /**
     * weapon: Get player's weapon mastery level
     * @param platform 
     * @param userid 
     */
    weapon(platform: Platform, userid: string): Promise<any> {
        return this.get(`/shards/${platform}/players/${userid}/weapon_mastery`)
    }

    /**
     * match: Get specific match data
     * @param platform 
     * @param matchid 
     */
    match(platform: Platform, matchid: string): Promise<any> {
        return this.get(`/shards/${platform}/matches/${matchid}`)
    }

    /**
     * leaderboards: Get season leaderboard of platform
     * @param platform 
     * @param seasonid 
     * @param gameMode 
     */
    leaderboards(
        platform: Platform | Region,
        seasonid: string,
        gameMode: GameMode,
    ): Promise<any> {
        return this.get(
            `/shards/${platform}/leaderboards/${seasonid}/${gameMode}`,
        )
    }

    /**
     * tournaments: Get all tournaments info
     * @param tid 
     */
    tournaments(tid = ''): Promise<any> {
        return this.get(`/tournaments/${tid}`)
    }

    /**
     * samples: Get sample match ids
     * @param platform 
     */
    samples(platform: BigPlatform): Promise<any> {
        return this.get(`/shards/${platform}/samples`)
    }

    /**
     * status: Get API server status
     */
    status(): Promise<any> {
        return this.get(`/status`)
    }
}

export default createInstance
