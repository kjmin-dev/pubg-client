import fetch, { createInstance } from '../src'
import api from './constant/api.json'
import testPlayer from './example/player-platform.json'

describe('prefix and key', () => {
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
})

describe('craete instance', () => {
    it('no parameter', () => {
        const instance = new createInstance()
        expect(instance.key).toBe("")
    })
    it('with key', () => {
        const instance = new createInstance(api.key)
        expect(instance.key).toBe(api.key)
    })
})

describe('player', () => {
    it('search player returned data', async () => {
        const res = await fetch.players('steam', 'leichtjoon')
        expect(res).toHaveProperty('data')
        expect(Array.isArray(res.data)).toBe(true)
        expect(res).toMatchObject(testPlayer)
    })
})

describe('seasons', () => {
    it('seasons returned data', async () => {
        const res = await fetch.seasons()
        expect(res).toHaveProperty('data')
        expect(Array.isArray(res.data)).toBe(true)
    })
})
