import fetch, { createInstance } from '../src'

/* example data */
import api from './constant/api.json'
import testPlayer from './example/player-platform.json'
import testPlayers from './example/players-platform.json'
import tournaments from './example/tournaments.json'
import samples from './example/samples.json'

describe('Environments', () => {
    it('set prefix', () => {
        fetch.prefix = api.prefix
        expect(fetch.prefix).toBe(api.prefix)
    })
    it('set key', () => {
        fetch.key = api.key
        expect(fetch.key).toBe(api.key)
        expect(fetch.checkKey()).toBe(true)
        expect(fetch.default_opts).toHaveProperty('headers')
    })
    it('set gzip response', () => {
        expect(fetch.gzip).toBe(false)
        fetch.gzip = true
        expect(fetch.gzip).toBe(true)
    })
})

describe('Craete instance', () => {
    it('no parameter', () => {
        const instance = new createInstance()
        expect(instance.key).toBe('')
    })
    it('with key', () => {
        const instance = new createInstance(api.key)
        expect(instance.key).toBe(api.key)
    })
})

describe('Player', () => {
    it('search players by name', async () => {
        //const res = await fetch.players('steam', 'leichtjoon')
        const res = await fetch.platform('steam').players('leichtjoon')
        expect(res).toHaveProperty('data')
        expect(Array.isArray(res.data)).toBe(true)
        expect(res).toMatchObject(testPlayers)
    })
    it('search player by identifier', async () => {
        /*
        const res = await fetch.player(
            'steam',
            'account.183bc4b2c3404935baf3d56fb434b393',
        )
        */
        const res = await fetch.platform('steam').user('account.183bc4b2c3404935baf3d56fb434b393').json()
        expect(res).toHaveProperty('data')
        expect(res).toMatchObject(testPlayer)
    })
})

describe('Seasons', () => {
    it('seasons returned data', async () => {
        const res = await fetch.seasons('steam')
        expect(res).toHaveProperty('data')
        expect(Array.isArray(res.data)).toBe(true)
    })
})

describe('Other apis', () => {
    it('samples', async () => {
        const res = await fetch.samples('steam')
        expect(res).toHaveProperty('data')
        expect(res).toMatchObject(samples)
    })

    it('tournaments', async () => {
        const res = await fetch.tournaments()
        expect(res).toHaveProperty('data')
        expect(res).toMatchObject(tournaments)
    })
})
