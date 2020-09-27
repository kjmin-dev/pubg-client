import _fetcher from './_fetcher'

type Sample_Platform = 'steam' | 'console' | 'kakao'

type Platform =
    | 'kakao'
    | 'stadia'
    | 'steam'
    | 'tournament' //Tournaments
    | 'psn' //PS4
    | 'xbox'
    | 'console' //PS4/Xbox (used for the /matches and /samples endpoints)

type Region =
    | 'pc-as' // PC
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
    | 'psn-as' // ps4
    | 'psn-eu'
    | 'psn-na'
    | 'psn-oc'
    | 'xbox-as' // xbox
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

interface API {
    players(platform: Platform, username: string): Promise<any>
    player(platform: Platform, userid: string): Promise<any>
    seasons(platform: Platform): Promise<string>
    lifetime(platform: Platform, userid: string): Promise<any>
    stat(platform: Platform, userid: string, seasonid: string): Promise<any>
    rankedStat(
        platform: Platform,
        userid: string,
        seasonid: string,
    ): Promise<any>
    weapon(platform: Platform, userid: string): Promise<any>
    match(platform: Platform, matchid: string): Promise<any>
    leaderboards(
        platform: Platform | Region,
        seasonid: string,
        gameMode: GameMode,
    ): Promise<any>
    tournaments(tid: string): Promise<any>
    samples(platform: Sample_Platform): Promise<any>
    status(): Promise<any>
    $platform(_platform: string): API_Platform
}

interface API_Season {
    stat(userid: string): Promise<any>
    rankedStat(userid: string): Promise<any>
    leaderboards(gameMode: GameMode): Promise<any>
}

interface API_User {
    json(): Promise<any>
    weapon(): Promise<any>
    lifetime(): Promise<any>
    stat(seasonid: string): Promise<any>
    rankedStat(seasonid: string): Promise<any>
}

interface API_Platform {
    $season(_seasonid: string): API_Season
    $user(_userid: string): API_User
    seasons(): Promise<any>
    players(username: string): Promise<any>
    player(userid: string): Promise<any>
    lifetime(userid: string): Promise<any>
    match(matchid: string): Promise<any>
    weapon(userid: string): Promise<any>
}

class createInstance extends _fetcher implements API {
    constructor(newKey = '') {
        super(newKey)
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
    samples(platform: Sample_Platform): Promise<any> {
        return this.get(`/shards/${platform}/samples`)
    }

    /**
     * status: Get API server status
     */
    status(): Promise<any> {
        return this.get(`/status`)
    }

    /**
     * Functional builder
     *  */
    /* entry: platform() */
    $platform(_platform: Platform): API_Platform {
        const context = this
        return {
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
            },
            weapon(userid: string) {
                return context.weapon(_platform, userid)
            },
            /* entry: playform().season() */
            $season(_seasonid: string): API_Season {
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
            // entry: platform().user()
            $user(_userid: string): API_User {
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
                    lifetime() {
                        return context.lifetime(_platform, _userid)
                    },
                    weapon() {
                        return context.weapon(_platform, _userid)
                    },
                }
            },
        }
    }
}

export default createInstance
